<script lang="ts">
	export let data;
</script>

<svelte:head>
	<meta name="robots" content="noindex,nofollow" />
</svelte:head>

<article class="mx-auto max-w-[60ch]">
	<h3 class="mx-auto max-w-[60ch] text-3xl mb-4">Emotions</h3>
</article>

<ul class="list-none grid gap-8 sm:grid-cols-2 lg:grid-cols-3 p-0 justify-items-center">
	{#each data.emotions as emotion}
		<li class="flex flex-col items-center text-center space-y-2">
			<a href={`/emotions/${emotion.slug}`} class="text-xl font-semibold">{emotion.title}</a>
			<p class="text-sm text-gray-500">{new Date(emotion.timestamp).toLocaleString()}</p>
		</li>
	{/each}
</ul>
