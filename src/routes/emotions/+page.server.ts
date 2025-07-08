import { client } from '$lib/sanity';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const emotions = await client.fetch(`
    *[_type=="emotion"]|order(timestamp desc){
      title,
      "slug": slug.current,
      timestamp,
      image
    }
  `);
	return { emotions };
};
