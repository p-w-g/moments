import { client } from '$lib/sanity';
import { error } from '@sveltejs/kit';

export const load = async ({ params }) => {
	const highlight = await client.fetch(
		`*[_type=="highlight" && slug.current==$slug][0]{
      title,
      image{
        alt,
        asset->{
          _id,
          url,
          metadata{ lqip, dimensions{ width, height } }
        }
      }
    }`,
		{ slug: params.slug }
	);
	if (!highlight) throw error(404);
	return { highlight };
};
