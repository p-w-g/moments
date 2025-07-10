<script lang="ts">
	import { urlFor } from '$lib/sanity';

	export let highlights: string | any[] = [];

	const orient = (h: Highlight) =>
		(h.image?.asset?.metadata?.dimensions?.width ?? 0) >
		(h.image?.asset?.metadata?.dimensions?.height ?? 0)
			? 'landscape'
			: 'portrait';
</script>

<div class="gallery masonry">
	{#each highlights as highlight}
		<div class={'item ' + orient(highlight)}>
			<a href={`/highlights/${highlight.slug}`}>
				<img src={urlFor(highlight.image).width(800).auto('format').url()} alt={highlight.title} />
			</a>
		</div>
	{/each}
</div>

<style>
	/* ----- masonry container -------------------------------------- */
	.masonry {
		column-width: 300px; /* preferred track width                 */
		column-count: 6; /* BUT never create more than six tracks */
		column-gap: 0.5rem;
	}

	/* responsive fall-back */
	@media (max-width: 1200px) {
		.masonry {
			column-count: 4;
		}
	}
	@media (max-width: 900px) {
		.masonry {
			column-count: 3;
		}
	}
	@media (max-width: 600px) {
		.masonry {
			column-count: 2;
		}
	}
	@media (max-width: 400px) {
		.masonry {
			column-count: 1;
		}
	}

	/* ----- items --------------------------------------------------- */
	.item {
		/* each figure lives in its own column box   */
		break-inside: avoid;
		margin-bottom: 1rem;
	}

	/* anchor wrappers */
	.item a {
		display: block;
		overflow: hidden; /* crop the zoomed image */
		/* border-radius: 8px; */
	}

	/* shared img rules */
	.item img {
		width: 100%;
		height: auto;
		transition: transform 0.35s ease;
	}

	/* landscape shots → square crop */
	.item.landscape img {
		aspect-ratio: 1 / 1; /* force 1:1 */
		object-fit: cover; /* crop top/bottom */
	}

	/* gentle zoom-in  */
	.item a:hover img {
		transform: scale(1.06);
		/* optional shadow pop */
		box-shadow: 0 3px 12px rgba(0, 0, 0, 0.25);
	}
	.gallery {
		margin-inline: auto; /* centres the masonry */
	}
</style>
