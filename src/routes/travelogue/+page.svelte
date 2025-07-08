<script lang="ts">
	import WordCloud from '$lib/WordCloud.svelte';
	import MomentFilters from '$lib/MomentFilters.svelte';

	export let data: { posts: any[] };
</script>

<MomentFilters tags={data.tags} chapters={data.chapters} active={data.active} />

<WordCloud words={data.posts} />
