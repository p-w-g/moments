import { client } from '$lib/sanity';
import type { Highlight, SanityImage } from '$lib/sanity';
import { pickForToday } from '$lib/dailyHero';

const highlightsQuery = `*[_type=="highlight"]|order(_createdAt desc){
	_id,
	title,
	"slug": slug.current,
	tags[]->{title, "slug": slug.current, order},
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

const heroPoolQuery = `*[_type=="highlight" && isHero==true]{
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
	const [highlights, heroPool]: [Highlight[], { image: SanityImage }[]] = await Promise.all([
		client.fetch(highlightsQuery),
		client.fetch(heroPoolQuery)
	]);
	const heroImage = pickForToday(heroPool)?.image ?? null;
	return { highlights, heroImage };
};
