<script lang="ts">
	import MomentFilters from '$lib/MomentFilters.svelte';
	export let data;
	const { chapters, moments } = data;
</script>

<MomentFilters tags={data.tags} chapters={data.chapters} active={data.active} />

{#each chapters as chapter}
	{#if data.active.chapter === null || chapter.title.toLowerCase() === data.active.chapter.toLowerCase()}
		<h3>{chapter.title}</h3>
		<ul>
			{#each moments.filter((m) => m.chapter.slug === chapter.slug) as m}
				<li><a href={`/travelogue/${m.slug}`}>{m.title}</a></li>
			{/each}
		</ul>
	{/if}
{/each}

<style>
</style>
