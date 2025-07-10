<script lang="ts">
	export let post; // comes from the detail-page loader
	export let nav: any = null; // default so caller can omit it // { prev, next } or null
</script>

<aside class="border rounded-lg p-4 mb-6 text-sm bg-surface/40">
	<p>⏱️ {post.readingMins}-min read</p>
	{#if post.indexInChapter && post.chapterTotal}
		<p>
			📖 Moment {post.indexInChapter} of {post.chapterTotal}
			in chapter&nbsp;
			<a href={`/travelogue?chapter=${post.chapter.slug}`} class="underline">
				{post.chapter.title}
			</a>
			<br />
			{#if nav}
				{#if nav.prev}
					<a href={`/travelogue/${nav.prev.slug}`}>← {nav.prev.title}</a>
				{/if}
				{#if nav.prev && nav.next}
					|
				{/if}
				{#if nav.next}
					<a href={`/travelogue/${nav.next.slug}`}>{nav.next.title} →</a>
				{/if}
			{/if}
		</p>
	{/if}
</aside>
