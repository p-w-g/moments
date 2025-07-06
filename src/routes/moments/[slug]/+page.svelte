<script lang="ts">
	import PortableImage from '$lib/PortableImage.svelte';
	import { PortableText } from '@portabletext/svelte';

	export let data: { post: any };
	console.log(data.post);
</script>

<article class="prose max-w-none mx-auto">
	<h1>{data.post.title}</h1>

	<!-- <PortableText
		value={data.post.body}
		components={{
			types: { image: PortableImage }
		}}
	/> -->

	<!--  iterate over every block in post.body  -->
	{#each data.post.body as chunk (chunk._key)}
		{#if chunk._type === 'image'}
			<!-- 📷  inline-image block -->
			<PortableImage value={chunk} />
		{:else}
			<!-- 📝  any non-image block (paragraph, h2, list, …) -->
			<!-- PortableText wants an *array*, so wrap the single chunk -->
			<PortableText value={[chunk]} />
		{/if}
	{/each}
</article>
