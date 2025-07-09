<script lang="ts">
	export let data;
	import { urlFor } from '$lib/sanity';
</script>

<h2 class="text-2xl mb-4">{data.highlight.title}</h2>

<picture>
	<source
		media="(min-width:1024px)"
		srcset={urlFor(data.highlight.image).width(1920).auto('format').url()}
	/>
	<source
		media="(min-width:640px)"
		srcset={urlFor(data.highlight.image).width(1280).auto('format').url()}
	/>
	<img
		src={urlFor(data.highlight.image).width(768).auto('format').url()}
		alt={data.highlight.title}
		class="w-full h-auto rounded-lg shadow"
	/>
</picture>
