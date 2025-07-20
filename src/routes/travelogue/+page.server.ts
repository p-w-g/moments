import { client } from '$lib/sanity';
import type { PageServerLoad } from './$types';

const allChaptersQuery = `
  *[_type=="chapter"]|order(title asc){
    title,
    "slug": slug.current
  }
`;

const postFields = `
  title,
  "slug": slug.current,
  publishedAt,
  tags,
  chapter->{title,"slug":slug.current},
  "book": chapter->book->{title, "slug": slug.current}
`;

export const load: PageServerLoad = async ({ url }) => {
	/* fetch chapters FIRST – independent of filters */
	const chapters = await client.fetch(allChaptersQuery);

	/* read filters from query-string */
	const tag = url.searchParams.get('tag');
	const chapter = url.searchParams.get('chapter');

	/* build posts WHERE clause only if needed */
	const filters: string[] = [];
	const params: Record<string, string> = {};

	if (tag) {
		filters.push('$tag in tags');
		params.tag = tag;
	}
	if (chapter) {
		filters.push('chapter->slug.current == $chapter');
		params.chapter = chapter;
	}

	const where = filters.length ? `*[_type=="post" && ${filters.join(' && ')}]` : '*[_type=="post"]';

	const postsQuery = `${where}|order(publishedAt desc){${postFields}}`;

	const moments = await client.fetch(postsQuery, params);

	/* unique tags for the other dropdown */
	const tags = await client.fetch('array::unique(*[_type=="post"].tags[])');

	return {
		moments,
		chapters, // ← from the independent query
		tags,
		active: { tag, chapter }
	};
};
