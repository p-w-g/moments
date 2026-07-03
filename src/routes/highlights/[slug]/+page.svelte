<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import GalleryImage from '$lib/GalleryImage.svelte';

	export let data;

	$: prevHref = data.nav.prev ? `/highlights/${data.nav.prev}` : null;
	$: nextHref = data.nav.next ? `/highlights/${data.nav.next}` : null;

	const handleKeydown = (e: KeyboardEvent) => {
		if (e.key === 'ArrowLeft' && prevHref) goto(prevHref);
		else if (e.key === 'ArrowRight' && nextHref) goto(nextHref);
		else if (e.key === 'Escape') goto('/#gallery');
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
</svelte:head>

<div class="highlight-layout" on:touchstart={handleTouchStart} on:touchend={handleTouchEnd}>
	<a class="back" href="/#gallery">← Gallery</a>

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
	</figure>

	<p class="caption">{data.highlight.title}</p>
</div>

<style>
	.highlight-layout {
		position: relative;
	}

	.back {
		position: absolute;
		top: var(--space-4);
		left: var(--space-4);
		z-index: 10;
		font-family: var(--font-body);
		font-size: 0.9rem;
		color: var(--color-muted);
	}

	.back:hover,
	.back:focus-visible {
		color: var(--color-text);
		text-decoration: none;
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
</style>
