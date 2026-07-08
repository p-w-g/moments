import { redirect } from '@sveltejs/kit';

// The gallery now lives on the homepage; keep old /highlights links alive.
export const GET = () => {
	throw redirect(301, '/#gallery');
};
