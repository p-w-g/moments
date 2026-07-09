import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET } from '$env/static/public';

// Fails loudly and specifically at import time — every route that loads
// data imports this module, so a missing/blank env var (e.g. not set for
// the Production context in Netlify, distinct from a local .env) turns
// into an unmissable server log line instead of a bare 500 from deep
// inside the Sanity SDK.
if (!PUBLIC_SANITY_PROJECT_ID) {
	throw new Error(
		'Sanity is not configured: PUBLIC_SANITY_PROJECT_ID is missing or blank. ' +
			'Check the Production environment variables in the Netlify site settings.'
	);
}

export const client = createClient({
	projectId: PUBLIC_SANITY_PROJECT_ID,
	dataset: PUBLIC_SANITY_DATASET || 'production',
	apiVersion: '2024-01-01',
	useCdn: true
});

export interface SanityImageExif {
	Make?: string;
	Model?: string;
	LensModel?: string;
	FocalLength?: number;
	FNumber?: number;
	ExposureTime?: number;
	ISO?: number;
	ISOSpeedRatings?: number;
	DateTimeOriginal?: string;
}

export interface SanityImage {
	alt?: string;
	asset?: {
		_id: string;
		url: string;
		metadata?: {
			lqip?: string;
			dimensions?: { width: number; height: number };
			exif?: SanityImageExif;
		};
	};
}

export type HighlightCategory = 'landmark' | 'nature' | 'animals' | 'food' | 'life';

export interface Highlight {
	_id: string;
	title: string;
	slug: string;
	tags: HighlightCategory[];
	caption?: string;
	image: SanityImage;
}

// EXIF exposure time is stored as a decimal fraction of a second (e.g. 0.005);
// display it the way photographers read shutter speed (e.g. "1/200s").
const formatShutterSpeed = (seconds: number) => {
	if (seconds >= 1) return `${seconds}s`;
	return `1/${Math.round(1 / seconds)}s`;
};

// EXIF dates use "YYYY:MM:DD HH:MM:SS" rather than a parseable ISO string.
const formatExifDate = (raw: string) => {
	const [datePart] = raw.split(' ');
	const [year, month, day] = datePart.split(':').map(Number);
	if (!year || !month || !day) return null;
	return new Date(Date.UTC(year, month - 1, day)).toLocaleDateString(undefined, {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		timeZone: 'UTC'
	});
};

export interface ExifSummary {
	date?: string;
	camera?: string;
	lens?: string;
	settings?: string;
}

export const summarizeExif = (exif?: SanityImageExif): ExifSummary => {
	if (!exif) return {};

	const date = exif.DateTimeOriginal
		? (formatExifDate(exif.DateTimeOriginal) ?? undefined)
		: undefined;
	const camera = [exif.Make, exif.Model].filter(Boolean).join(' ') || undefined;
	const lens = exif.LensModel || undefined;

	const iso = exif.ISO ?? exif.ISOSpeedRatings;
	const settings = [
		exif.FocalLength ? `${exif.FocalLength}mm` : null,
		exif.FNumber ? `f/${exif.FNumber}` : null,
		exif.ExposureTime ? formatShutterSpeed(exif.ExposureTime) : null,
		iso ? `ISO ${iso}` : null
	]
		.filter(Boolean)
		.join(' · ');

	return { date, camera, lens, settings: settings || undefined };
};

const builder = imageUrlBuilder(client);
export const urlFor = (src: SanityImage) => {
	return builder.image(src);
};
