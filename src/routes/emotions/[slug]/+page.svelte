<script lang="ts">
	import { urlFor } from '$lib/sanity';
	export let data;
</script>

<svelte:head>
	<meta name="robots" content="noindex,nofollow" />
</svelte:head>

<article class="mx-auto max-w-[60ch]">
	<h3>{data.emotion.title}</h3>
	<p class="text-sm text-gray-500">
		{new Date(data.emotion.timestamp).toLocaleString()}
	</p>

	{#if data.emotion.image}
		<img
			src={urlFor(data.emotion.image).url()}
			alt={data.emotion.image.alt ?? ''}
			class="rounded-lg my-4"
		/> <br />
	{/if}

	{#if data.emotion.notes}
		<p>{data.emotion.notes}</p>
	{/if}

	<nav class="mt-8 flex justify-between text-sm">
		{#if data.navLinks.earlier}
			<a href={`/emotions/${data.navLinks.earlier.slug}`}> ← Starszy wpis </a>
		{/if}
		{#if data.navLinks.later}
			<a href={`/emotions/${data.navLinks.later.slug}`}> Nowszy wpis → </a>
		{/if}
	</nav>
</article>
