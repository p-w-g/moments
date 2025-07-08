import { client } from '$lib/sanity';
import { error } from '@sveltejs/kit';

const postQuery = `
*[_type=="post" && slug.current==$slug][0]{
  ...,                            
  "readingMins": round(length(pt::text(body))/5/180),
  chapter->{
      title,
      "slug": slug.current,
      book->{
        title,
        "slug": slug.current
      }
  },
  tags,
    "indexInChapter":
    1 + count(*[
      _type=="post"
      && chapter._ref == ^.chapter._ref
      && publishedAt < ^.publishedAt   
    ]),
    "chapterTotal":
    count(*[
      _type=="post"
      && chapter._ref == ^.chapter._ref
    ]),

  chapter->{ title, "slug": slug.current }
}`;

const navQuery = `
*[_type=="post" && chapter->slug.current == $chapterSlug]
  | order(publishedAt asc){
    "slug": slug.current,
    title
}`;

export const load = async ({ params }) => {
	const post = await client.fetch(postQuery, { slug: params.slug });
	if (!post) throw error(404, 'Not found');

	let nav = null;
	if (post.series) {
		const list = await client.fetch(navQuery, { seriesSlug: post.series.slug });
		const idx = list.findIndex((p) => p.slug === params.slug);
		nav = {
			prev: list[idx - 1] ?? null,
			next: list[idx + 1] ?? null
		};
	}
	return { post, nav };
};
