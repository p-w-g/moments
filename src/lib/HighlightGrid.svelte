<script lang="ts">
	import { urlFor } from '$lib/sanity';

	export let highlights: string | any[] = [];

	const classes =
		highlights.length === 1
			? 'flex justify-center'
			: highlights.length === 2
				? 'flex justify-between'
				: 'grid sm:grid-cols-3 gap-4';
</script>

<div class={classes}>
	{#each highlights as h}
		<a class="block w-80 max-w-full" href={`/highlights/${h.slug}`}>
			<img
				src={urlFor(h.image).width(800).height(600).fit('crop').auto('format').url()}
				alt={h.title}
				class="w-full h-auto rounded-lg shadow"
			/>
		</a>
	{/each}
</div>
