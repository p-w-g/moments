<script lang="ts">
	import { urlFor, type SanityImage } from '$lib/sanity';

	export let image: SanityImage | undefined;
	export let alt = '';
	export let sizes = '100vw';
	export let priority = false;
	export let fit: 'cover' | 'contain' = 'cover';
	// Auto-derive the box's aspect ratio from the asset's true dimensions.
	// Set false when the parent element already controls the box height
	// (e.g. a fixed-height viewer) and the image should fit inside it.
	export let aspectRatio = true;

	const widths = [400, 640, 800, 1080, 1400, 1800, 2400];

	$: dimensions = image?.asset?.metadata?.dimensions;
	$: lqip = image?.asset?.metadata?.lqip;
	$: src = image ? urlFor(image).width(1400).auto('format').quality(80).url() : '';
	$: srcset = image
		? widths
				.map((w) => `${urlFor(image).width(w).auto('format').quality(80).url()} ${w}w`)
				.join(', ')
		: '';
	$: ratio = dimensions ? `${dimensions.width} / ${dimensions.height}` : '3 / 2';

	let loaded = false;
	let imgEl: HTMLImageElement | undefined;

	// On a hard refresh, the browser can start (and finish, from cache) loading
	// the SSR-rendered <img> before hydration attaches the on:load listener —
	// the event fires and is missed, leaving the image stuck behind its blur
	// placeholder even though it's fully loaded. Re-check once hydrated.
	$: if (src && imgEl?.complete) loaded = true;
</script>

{#if image}
	<div class="frame" style:aspect-ratio={aspectRatio ? ratio : undefined} style:--fit={fit}>
		{#if lqip}
			<img class="placeholder" src={lqip} alt="" aria-hidden="true" />
		{/if}
		<img
			class="full"
			class:loaded
			bind:this={imgEl}
			{src}
			{srcset}
			{sizes}
			{alt}
			width={dimensions?.width}
			height={dimensions?.height}
			loading={priority ? 'eager' : 'lazy'}
			fetchpriority={priority ? 'high' : 'auto'}
			decoding="async"
			on:load={() => (loaded = true)}
		/>
	</div>
{/if}

<style>
	.frame {
		position: relative;
		overflow: hidden;
		width: 100%;
		height: 100%;
	}

	.placeholder,
	.full {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: var(--fit, cover);
	}

	.placeholder {
		filter: blur(24px);
		transform: scale(1.08);
	}

	.full {
		opacity: 0;
		transition: opacity var(--transition-base, 300ms ease);
	}

	.full.loaded {
		opacity: 1;
	}

	@media (prefers-reduced-motion: reduce) {
		.full {
			transition: none;
		}
	}
</style>
