<script lang="ts">
	export let post; // comes from the detail-page loader
	export let nav: any = null; // default so caller can omit it // { prev, next } or null
</script>

<aside class="border rounded-lg p-4 mb-6 text-sm bg-surface/40">
	<p>⏱️ {post.readingMins}-min read</p>

	{#if post.chapter}
		<p>
			<a href={`/moments?chapter=${post.chapter.slug}`} class="underline">
				{post.chapter.title}
			</a>
		</p>
	{/if}

	<!-- nav within chapter -->
	{#if nav}
		<div class="flex justify-between mt-4">
			{#if nav.prev}
				<a href={`/moments/${nav.prev.slug}`} class="button">← {nav.prev.title}</a>
			{/if}
			{#if nav.next}
				<a href={`/moments/${nav.next.slug}`} class="button ml-auto">{nav.next.title} →</a>
			{/if}
		</div>
	{/if}
</aside>
