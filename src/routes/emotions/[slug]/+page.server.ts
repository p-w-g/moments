import { client } from '$lib/sanity';
import { error } from '@sveltejs/kit';

const base = `
  *[_type=="emotion" && slug.current==$slug][0]{
    title,
    timestamp,
    image,
    notes,
    "slug": slug.current
  }`;

const nav = `
  *[_type=="emotion"]|order(timestamp asc){
    "slug": slug.current,
    title
  }`;

export const load = async ({ params }) => {
	const emotion = await client.fetch(base, { slug: params.slug });
	if (!emotion) throw error(404, 'Not found');

	// earlier / later navigation
	const list = await client.fetch(nav);
	const idx = list.findIndex((e) => e.slug === params.slug);
	const navLinks = {
		earlier: list[idx - 1] ?? null, // older timestamp
		later: list[idx + 1] ?? null
	};

	return { emotion, navLinks };
};
