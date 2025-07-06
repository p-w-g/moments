import { client } from '$lib/sanity';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

const query = `
  *[_type == "post" && slug.current == $slug][0]{
    title,
    body,
    publishedAt,
    "slug": slug.current
  }
`;
export const load: PageServerLoad = async ({ params }) => {
	const post = await client.fetch(query, { slug: params.slug });
	console.log(post);
	if (!post) throw error(404, 'Post not found');
	return { post };
};
