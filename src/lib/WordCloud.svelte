<script lang="ts">
	export let words: { title: string; slug: string }[] = [];

	import { onMount } from 'svelte';

	// we generate positions *after* mount to avoid
	// SSR ↔️ hydration mismatches.
	let cloud: { title: string; slug: string; x: number; y: number; rot: number }[] = [];

	onMount(() => {
		// spread words roughly inside a 100×100 box (%)
		cloud = words.map((w, i) => {
			// polar → cartesian for a nicer radial scatter
			const r = Math.random() * 45 + 5; // 5 – 50 % radius
			const phi = Math.random() * 2 * Math.PI;
			const x = 50 + r * Math.cos(phi); // centre = 50 %
			const y = 50 + r * Math.sin(phi);

			return {
				...w,
				x,
				y,
				rot: Math.random() < 0.35 ? 90 : 0 // ~1⁄3 vertical
			};
		});
	});
</script>

<div class="cloud">
	{#each cloud as w (w.slug)}
		<a
			class="word"
			href={`/travelogue/${w.slug}`}
			style="
        left:{w.x}%;
        top:{w.y}%;
        transform:translate(-50%,-50%) rotate({w.rot}deg);
        --rot:{w.rot}deg;"
		>
			{w.title}
		</a>
	{/each}
</div>

<style>
	.cloud {
		position: relative;
		width: 100%;
		height: clamp(300px, 60vh, 600px);
		/* allow pointer events for children but keep container “invisible” */
	}
	.word {
		position: absolute;
		font-weight: 600;
		color: var(--color-accent, #d95f02);
		text-decoration: none;
		white-space: nowrap;
		transition:
			transform 0.2s ease,
			color 0.2s ease;
	}
	.word:hover {
		transform: translate(-50%, -50%) scale(1.1) rotate(var(--rot));
		color: var(--color-text, #0f4c81);
	}
</style>
