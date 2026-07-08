import { redirect } from '@sveltejs/kit';

// The gallery now lives on the homepage's "Selected Work" section; keep old /highlights links alive.
export const GET = () => {
	throw redirect(301, '/#work');
};
