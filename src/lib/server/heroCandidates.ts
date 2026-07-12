import { createClient } from '@sanity/client';
import { env } from '$env/dynamic/private';
import { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET } from '$env/static/public';
import type { SanityImage } from '$lib/sanity';

export interface HeroCandidate {
	_id: string;
	title: string;
	isDraft: boolean;
	image: SanityImage;
}

const projection = `{
	_id,
	title,
	"isDraft": _id in path("drafts.**"),
	image{
		alt,
		asset->{
			_id,
			url,
			metadata{ lqip, dimensions{ width, height } }
		}
	}
}`;

function draftsClient() {
	if (!env.SANITY_API_EDITOR_TOKEN) return null;
	return createClient({
		projectId: PUBLIC_SANITY_PROJECT_ID,
		dataset: PUBLIC_SANITY_DATASET ?? 'production',
		apiVersion: '2024-01-01',
		useCdn: false,
		perspective: 'drafts',
		token: env.SANITY_API_EDITOR_TOKEN
	});
}

export async function fetchHeroCandidates(): Promise<{
	candidates: HeroCandidate[];
	missingToken: boolean;
}> {
	const client = draftsClient();
	if (!client) return { candidates: [], missingToken: true };

	const candidates: HeroCandidate[] = await client.fetch(
		`*[_type=="highlight" && isHero==true]${projection}`
	);
	return { candidates, missingToken: false };
}

export async function fetchHeroCandidateById(id: string): Promise<HeroCandidate | null> {
	const client = draftsClient();
	if (!client) return null;

	return client.fetch(`*[_type=="highlight" && _id==$id][0]${projection}`, { id });
}
