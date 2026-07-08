import { client } from '$lib/sanity';
import { error } from '@sveltejs/kit';

const orderedSlugsQuery = `*[_type=="highlight"]|order(_createdAt desc){"slug": slug.current}`;

export const load = async ({ params }) => {
	const highlight = await client.fetch(
		`*[_type=="highlight" && slug.current==$slug][0]{
      title,
      caption,
      image{
        alt,
        asset->{
          _id,
          url,
          metadata{ lqip, dimensions{ width, height }, exif }
        }
      }
    }`,
		{ slug: params.slug }
	);
	if (!highlight) throw error(404);

	const ordered: { slug: string }[] = await client.fetch(orderedSlugsQuery);
	const index = ordered.findIndex((h) => h.slug === params.slug);
	const nav = {
		prev: index > 0 ? ordered[index - 1].slug : null,
		next: index !== -1 && index < ordered.length - 1 ? ordered[index + 1].slug : null
	};

	return { highlight, nav };
};
