<script lang="ts">
	import WordCloud from '$lib/WordCloud.svelte';
	export let data: { posts: any[] };
</script>

<WordCloud words={data.posts} />
