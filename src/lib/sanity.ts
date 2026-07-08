import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET } from '$env/static/public';

export const client = createClient({
	projectId: PUBLIC_SANITY_PROJECT_ID,
	dataset: PUBLIC_SANITY_DATASET ?? 'production',
	apiVersion: '2024-01-01',
	useCdn: true
});

export interface SanityImage {
	alt?: string;
	asset?: {
		_id: string;
		url: string;
		metadata?: {
			lqip?: string;
			dimensions?: { width: number; height: number };
		};
	};
}

export interface Highlight {
	_id: string;
	title: string;
	slug: string;
	image: SanityImage;
}

const builder = imageUrlBuilder(client);
export const urlFor = (src: SanityImage) => {
	return builder.image(src);
};
