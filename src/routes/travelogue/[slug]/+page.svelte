<script lang="ts">
	import InfoBox from '$lib/InfoBox.svelte';
	import PortableImage from '$lib/PortableImage.svelte';
	import { PortableText } from '@portabletext/svelte';

	export let data: { post: any; nav: any };
</script>

<article class="prose mx-auto px-4">
	<br />
	<h2>{data.post.title}</h2>

	<InfoBox post={data.post} nav={data.nav} />
	<!--  iterate over every block in post.body  -->
	{#each data.post.body as chunk (chunk._key)}
		{#if chunk._type === 'image'}
			<!-- 📷  inline-image block -->
			<PortableImage value={chunk} />
			<br />
		{:else}
			<!-- 📝  any non-image block (paragraph, h2, list, …) -->
			<!-- PortableText wants an *array*, so wrap the single chunk -->
			<PortableText value={[chunk]} />
			<br />
		{/if}
	{/each}
</article>
