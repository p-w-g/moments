<script lang="ts">
	export let data;
	import { urlFor } from '$lib/sanity';
</script>

<div class="highlight-layout">
	<figure>
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
			/>
		</picture>
	</figure>
</div>
