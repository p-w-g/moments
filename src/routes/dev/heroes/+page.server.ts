import { error } from '@sveltejs/kit';
import { createClient } from '@sanity/client';
import { dev } from '$app/environment';
import { env } from '$env/dynamic/private';
import { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET } from '$env/static/public';
import type { SanityImage } from '$lib/sanity';

interface HeroCandidate {
	_id: string;
	title: string;
	isDraft: boolean;
	image: SanityImage;
}

// Local-only preview of every hero-eligible photo — including drafts, so a
// candidate can be judged with real overlay text before it's published.
// Never reachable in a deployed build: SvelteKit only includes routes in
// the build, but this also 404s defensively if one is ever hit outside dev.
export const load = async () => {
	if (!dev) throw error(404);

	if (!env.SANITY_API_READ_TOKEN) {
		return { candidates: [] as HeroCandidate[], missingToken: true };
	}

	const draftsClient = createClient({
		projectId: PUBLIC_SANITY_PROJECT_ID,
		dataset: PUBLIC_SANITY_DATASET ?? 'production',
		apiVersion: '2024-01-01',
		useCdn: false,
		perspective: 'drafts',
		token: env.SANITY_API_READ_TOKEN
	});

	const candidates: HeroCandidate[] = await draftsClient.fetch(
		`*[_type=="highlight" && isHero==true]{
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
		}`
	);

	return { candidates, missingToken: false };
};
