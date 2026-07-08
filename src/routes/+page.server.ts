import { client } from '$lib/sanity';
import type { Highlight } from '$lib/sanity';

const highlightsQuery = `*[_type=="highlight"]|order(_createdAt desc){
	_id,
	title,
	"slug": slug.current,
	category,
	caption,
	image{
		alt,
		asset->{
			_id,
			url,
			metadata{ lqip, dimensions{ width, height } }
		}
	}
}`;

export const load = async () => {
	const highlights: Highlight[] = await client.fetch(highlightsQuery);
	return { highlights };
};
