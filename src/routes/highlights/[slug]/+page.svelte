<script lang="ts">
	import GalleryImage from '$lib/GalleryImage.svelte';
	export let data;
</script>

<div class="highlight-layout">
	<figure>
		<GalleryImage
			image={data.highlight.image}
			alt={data.highlight.image?.alt ?? data.highlight.title}
			fit="contain"
			aspectRatio={false}
			sizes="100vw"
			priority
		/>
	</figure>
</div>
