<script lang="ts">
	export let tags: string[];
	export let chapters: { title: string; slug: string }[];
	export let active: { tag: string | null; chapter: string | null };

	const goto = (tag: string | null, chapter: string | null) => {
		const qs = new URLSearchParams();
		if (tag) qs.set('tag', tag);
		if (chapter) qs.set('chapter', chapter);
		window.location.search = qs.toString();
	};
</script>

<div class="flex flex-wrap gap-2 mb-6">
	<!-- <select on:change={(e) => gotoFiltered(e.target.value || null, active.series)}>
		<option value="">︙ All tags</option>
		{#each tags as t}
			<option value={t} selected={t === active.tag}>{t}</option>
		{/each}
	</select> -->

	<select on:change={(e) => goto(active.tag, e.target.value || null)}>
		<option value="">︙ All chapters</option>
		{#each chapters as c}
			<option value={c.slug} selected={c.slug === active.chapter}>{c.title}</option>
		{/each}
	</select>
</div>
