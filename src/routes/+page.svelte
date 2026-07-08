<script lang="ts">
	import { page } from '$app/stores';
	import HighlightGrid from '$lib/HighlightGrid.svelte';
	import { urlFor, type Highlight } from '$lib/sanity';
	import { jsonLdScriptTag } from '$lib/jsonLd';

	export let data: { highlights: Highlight[] };
	const bg = '/DSC_2359_s.webp';

	const description = 'Everything is a moment — a photography gallery.';

	$: ogImage = new URL(bg, $page.url.origin).toString();
	$: jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'ImageGallery',
		name: 'moments',
		description,
		image: data.highlights
			.filter((h) => h.image?.asset)
			.map((h) => urlFor(h.image).width(1600).auto('format').url())
	};
	$: jsonLdScript = jsonLdScriptTag(jsonLd);
</script>

<svelte:head>
	<meta name="description" content={description} />
	<meta property="og:title" content="moments — photography" />
	<meta property="og:description" content={description} />
	<meta property="og:type" content="website" />
	<meta property="og:image" content={ogImage} />
	<meta name="twitter:card" content="summary_large_image" />
	<!-- eslint-disable-next-line svelte/no-at-html-tags -- jsonLdScript is built from JSON.stringify with `<` escaped, not raw markup -->
	{@html jsonLdScript}
</svelte:head>

<section class="hero" style={`--hero-url: url('${bg}')`}>
	<div class="hero-content">
		<h1>Everything is a moment</h1>
	</div>
	<a class="scroll-cue" href="#gallery" aria-label="Scroll to the gallery">↓</a>
</section>

<section id="gallery" class="gallery-section">
	<HighlightGrid highlights={data.highlights} />
</section>

<style>
	.scroll-cue {
		position: absolute;
		bottom: var(--space-8);
		left: 50%;
		transform: translateX(-50%);
		color: #fff8f1;
		font-size: 1.5rem;
		line-height: 1;
		opacity: 0.8;
	}

	.scroll-cue:hover,
	.scroll-cue:focus-visible {
		opacity: 1;
		text-decoration: none;
	}

	.gallery-section {
		padding: var(--space-8) var(--space-2);
	}

	@media (min-width: 640px) {
		.gallery-section {
			padding: var(--space-12) var(--space-4);
		}
	}
</style>
