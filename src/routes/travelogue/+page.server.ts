import { client } from '$lib/sanity';
import type { PageServerLoad } from './$types';

const query = `
  *[_type == "post"]
    | order(publishedAt desc){
      title,
      "slug": slug.current,
      publishedAt,
      tags,

      // bring chapter fields
      chapter->{title, "slug": slug.current},

      // hop to chapter, then to its book, and alias the result as book
      "book": chapter->book->{title, "slug": slug.current}
    }
`;

export const load: PageServerLoad = async () => {
	const posts = await client.fetch(query);
	return { posts };
};
