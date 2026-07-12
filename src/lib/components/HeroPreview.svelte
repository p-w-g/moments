<script lang="ts">
	import { urlFor, type SanityImage } from '$lib/sanity';

	export let image: SanityImage | undefined;
	export let eyebrow = 'Travel · Food · Everyday Life';
	export let subcopy =
		'A working photo journal — cities at odd hours, the animals in them, and the small moments in between.';
</script>

<div class="hero">
	{#if image?.asset}
		<img
			class="hero-image"
			src={urlFor(image).width(2400).auto('format').quality(80).url()}
			alt={image.alt ?? ''}
			loading="lazy"
		/>
	{/if}
	<div class="hero-scrim" aria-hidden="true"></div>
	<div class="hero-content">
		<p class="eyebrow">{eyebrow}</p>
		<h2>Frames from<br />the road.</h2>
		<p class="subcopy">{subcopy}</p>
	</div>
</div>

<style>
	.hero {
		position: relative;
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	.hero-image {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center 30%;
	}

	.hero-scrim {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			180deg,
			rgba(14, 13, 12, 0.25) 0%,
			rgba(14, 13, 12, 0.05) 32%,
			rgba(14, 13, 12, 0.85) 100%
		);
	}

	.hero-content {
		position: absolute;
		left: 48px;
		right: 48px;
		bottom: 56px;
		max-width: 640px;
	}

	.eyebrow {
		font-size: 13px;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: #d98a3d;
		margin: 0;
		font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Arial, sans-serif;
	}

	.hero-content h2 {
		margin: 18px 0 0;
		font-size: clamp(40px, 6vw, 84px);
		line-height: 1.03;
		font-weight: 400;
		letter-spacing: -0.01em;
		color: #f5f2ec;
		font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Arial, sans-serif;
	}

	.hero-content .subcopy {
		margin: 20px 0 0;
		font-size: 17px;
		line-height: 1.6;
		color: rgba(245, 242, 236, 0.68);
		max-width: 440px;
		font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Arial, sans-serif;
	}
</style>
