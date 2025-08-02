<script lang="ts">
	import MomentFilters from '$lib/MomentFilters.svelte';
	export let data;
	const { chapters, moments } = data;
</script>

<MomentFilters tags={data.tags} chapters={data.chapters} active={data.active} />
<div class="chapter-cloud">
	{#each chapters as chapter}
		{#if data.active.chapter === null || chapter.title.toLowerCase() === data.active.chapter.toLowerCase()}
			<section>
				<h3>{chapter.title}</h3>
				<ul>
					{#each moments.filter((m) => m.chapter.slug === chapter.slug) as m}
						<li><a href={`/travelogue/${m.slug}`}>{m.title}</a></li>
					{/each}
				</ul>
			</section>
		{/if}
	{/each}
</div>

<style>
	/* ────────────────────────────
   Chapter list wrapper
   ──────────────────────────── */
	.chapter-cloud {
		/* 1 col by default, centred */
		display: grid;
		grid-template-columns: 1fr;
		gap: 2rem 3rem; /* row / column gap            */
		max-width: 80rem; /* keeps it from stretching    */
		margin-inline: auto; /* centre inside the viewport  */
		padding-inline: 1rem;

		ul {
			margin: 0 0 1.4rem;
			padding-left: 1.1rem;
			list-style: square;
		}
		li {
			margin: 0.15rem 0;
			list-style-type: counter;
		}
		a {
			text-decoration: none;
			transition: color 0.2s;
		}
	}
	a:hover {
		color: var(--accent);
	}

	/* ≥ 768 px → 3 columns */
	@media (min-width: 768px) {
		.chapter-cloud {
			grid-template-columns: repeat(3, 1fr);
		}
	}
</style>
