import { client } from '$lib/sanity';
import type { PageServerLoad } from './$types';

const query = `*[_type == "post"]|order(publishedAt desc){
  _id,
  title,
  "slug": slug.current,
  publishedAt,
}`;

export const load: PageServerLoad = async () => {
	const posts = await client.fetch(query);
	return { posts };
};
