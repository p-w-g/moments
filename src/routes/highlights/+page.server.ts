import { client } from '$lib/sanity';

export const load = async () => {
	const highlights = await client.fetch(`
    *[_type == "highlight"]{
      _id,
      title,
      "slug": slug.current,
      image{
        alt,
        asset->{
          _id,
          url,
          metadata{ lqip, dimensions{ width, height } }
        }
      }
    } | order(_createdAt desc)
  `);
	return { highlights };
};
