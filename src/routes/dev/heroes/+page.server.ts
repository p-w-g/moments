import { error } from '@sveltejs/kit';
import { dev } from '$app/environment';
import { fetchHeroCandidates } from '$lib/server/heroCandidates';

// Local-only preview of every hero-eligible photo — including drafts, so a
// candidate can be judged with real overlay text before it's published.
// Never reachable in a deployed build: SvelteKit only includes routes in
// the build, but this also 404s defensively if one is ever hit outside dev.
export const load = async () => {
	if (!dev) throw error(404);

	return fetchHeroCandidates();
};
