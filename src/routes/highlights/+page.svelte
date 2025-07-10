<script lang="ts">
	import HighlightGrid from '$lib/HighlightGrid.svelte';
	export let data;
	const { highlights } = data;
</script>

<HighlightGrid {highlights} />
