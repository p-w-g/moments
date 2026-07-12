import { error } from '@sveltejs/kit';
import { dev } from '$app/environment';
import { fetchHeroCandidateById } from '$lib/server/heroCandidates';

// Single-candidate, chrome-free hero render, meant to be loaded in an
// <iframe> sized to a specific device viewport — see /dev/heroes, which
// scales these down to preview mobile/small-desktop/2K side by side.
export const load = async ({ params }) => {
	if (!dev) throw error(404);

	const candidate = await fetchHeroCandidateById(params.id);
	if (!candidate) throw error(404);

	return { candidate };
};
