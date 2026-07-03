<script lang="ts">
	import HighlightGrid from '$lib/HighlightGrid.svelte';

	export let data;
	const bg = '/DSC_2359_s.webp';
</script>

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
