<script lang="ts">
	import GalleryImage from '$lib/GalleryImage.svelte';
	import type { Highlight } from '$lib/sanity';

	export let highlights: Highlight[] = [];
</script>

<div class="gallery">
	{#each highlights as highlight (highlight._id)}
		<a class="item" href={`/highlights/${highlight.slug}`}>
			<GalleryImage
				image={highlight.image}
				alt={highlight.image?.alt ?? highlight.title}
				sizes="(min-width: 1200px) 16vw, (min-width: 900px) 25vw, (min-width: 600px) 33vw, 50vw"
			/>
		</a>
	{/each}
</div>

<style>
	.gallery {
		column-width: 300px; /* preferred track width */
		column-count: 6; /* but never more than six tracks */
		column-gap: var(--space-2);
		margin-inline: auto;
	}

	@media (max-width: 1200px) {
		.gallery {
			column-count: 4;
		}
	}
	@media (max-width: 900px) {
		.gallery {
			column-count: 3;
		}
	}
	@media (max-width: 600px) {
		.gallery {
			column-count: 2;
		}
	}
	@media (max-width: 400px) {
		.gallery {
			column-count: 1;
		}
	}

	.item {
		display: block;
		break-inside: avoid;
		margin-bottom: var(--space-2);
		overflow: hidden;
		transition: opacity var(--transition-base);
	}

	.item:hover,
	.item:focus-visible {
		opacity: 0.92;
	}

	.item:focus-visible {
		outline: 2px solid var(--color-accent);
		outline-offset: 2px;
	}

	@media (prefers-reduced-motion: reduce) {
		.item {
			transition: none;
		}
	}
</style>
