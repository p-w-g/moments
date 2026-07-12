<script lang="ts">
	import HeroPreview from '$lib/components/HeroPreview.svelte';
	import type { HeroCandidate } from '$lib/server/heroCandidates';

	export let data: { candidate: HeroCandidate };
</script>

<svelte:head>
	<title>{data.candidate.title} — hero frame</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="frame">
	<HeroPreview image={data.candidate.image} />
</div>

<style>
	:global(html),
	:global(body) {
		margin: 0;
		height: 100%;
	}

	.frame {
		width: 100vw;
		height: 100vh;
	}
</style>
