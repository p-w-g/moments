<script lang="ts">
	import { urlFor } from '$lib/sanity';
	export let value: any;

	$: src = value?.asset?._ref ? urlFor(value).width(800).url() : null;
</script>

{#if src}
	<img {src} alt={value.alt ?? ''} class="rounded-lg my-6" />
{/if}
