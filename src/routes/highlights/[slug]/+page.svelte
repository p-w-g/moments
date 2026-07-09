<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import GalleryImage from '$lib/GalleryImage.svelte';
	import { urlFor, summarizeExif } from '$lib/sanity';
	import { jsonLdScriptTag } from '$lib/jsonLd';

	export let data;

	$: exif = summarizeExif(data.highlight.image?.asset?.metadata?.exif);
	$: prevHref = data.nav.prev ? `/highlights/${data.nav.prev}` : null;
	$: nextHref = data.nav.next ? `/highlights/${data.nav.next}` : null;
	$: description = `Photograph: ${data.highlight.title}`;
	$: ogImage = data.highlight.image?.asset
		? urlFor(data.highlight.image).width(1200).auto('format').url()
		: null;
	$: jsonLd = data.highlight.image?.asset
		? {
				'@context': 'https://schema.org',
				'@type': 'ImageObject',
				name: data.highlight.title,
				contentUrl: urlFor(data.highlight.image).width(1920).auto('format').url(),
				url: $page.url.href
			}
		: null;
	$: jsonLdScript = jsonLd ? jsonLdScriptTag(jsonLd) : null;

	const handleKeydown = (e: KeyboardEvent) => {
		if (e.key === 'ArrowLeft' && prevHref) goto(prevHref);
		else if (e.key === 'ArrowRight' && nextHref) goto(nextHref);
		else if (e.key === 'Escape') goto('/#work');
	};

	let touchStartX = 0;
	const handleTouchStart = (e: TouchEvent) => {
		touchStartX = e.changedTouches[0].clientX;
	};
	const handleTouchEnd = (e: TouchEvent) => {
		const dx = e.changedTouches[0].clientX - touchStartX;
		const swipeThreshold = 50;
		if (dx > swipeThreshold && prevHref) goto(prevHref);
		else if (dx < -swipeThreshold && nextHref) goto(nextHref);
	};

	onMount(() => {
		window.addEventListener('keydown', handleKeydown);
		return () => window.removeEventListener('keydown', handleKeydown);
	});
</script>

<svelte:head>
	<title>{data.highlight.title} — moments</title>
	<meta name="description" content={description} />
	<meta property="og:title" content={data.highlight.title} />
	<meta property="og:description" content={description} />
	<meta property="og:type" content="website" />
	{#if ogImage}
		<meta property="og:image" content={ogImage} />
	{/if}
	<meta name="twitter:card" content="summary_large_image" />
	{#if jsonLdScript}
		<!-- eslint-disable-next-line svelte/no-at-html-tags -- jsonLdScript is built from JSON.stringify with `<` escaped, not raw markup -->
		{@html jsonLdScript}
	{/if}
</svelte:head>

<div class="highlight-layout" on:touchstart={handleTouchStart} on:touchend={handleTouchEnd}>
	{#if prevHref}
		<a class="edge prev" href={prevHref} aria-label="Previous photo">‹</a>
	{/if}
	{#if nextHref}
		<a class="edge next" href={nextHref} aria-label="Next photo">›</a>
	{/if}

	<figure>
		<GalleryImage
			image={data.highlight.image}
			alt={data.highlight.image?.alt ?? data.highlight.title}
			fit="contain"
			aspectRatio={false}
			sizes="100vw"
			priority
		/>
		<figcaption class="caption">
			<p class="caption-title">{data.highlight.title}</p>
			{#if data.highlight.caption}
				<p class="caption-description">{data.highlight.caption}</p>
			{/if}
			{#if exif.date || exif.camera || exif.settings}
				<p class="caption-meta">
					{[exif.date, exif.camera, exif.lens, exif.settings].filter(Boolean).join(' · ')}
				</p>
			{/if}
		</figcaption>
	</figure>
</div>

<style>
	.highlight-layout {
		position: relative;
	}

	.edge {
		position: absolute;
		top: 50%;
		translate: 0 -50%;
		z-index: 10;
		font-size: 2.5rem;
		line-height: 1;
		padding: var(--space-2) var(--space-3);
		color: var(--color-muted);
	}

	.edge:hover,
	.edge:focus-visible {
		color: var(--color-text);
		text-decoration: none;
	}

	.edge.prev {
		left: var(--space-2);
	}

	.edge.next {
		right: var(--space-2);
	}

	.caption {
		text-align: center;
		font-family: var(--font-body);
		color: var(--color-muted);
		margin: var(--space-4) 0 0;
	}

	.caption-title {
		margin: 0;
		color: var(--color-text);
	}

	.caption-description {
		margin: var(--space-1) 0 0;
	}

	.caption-meta {
		margin: var(--space-1) 0 0;
		font-size: 0.85rem;
		opacity: 0.75;
	}
</style>
