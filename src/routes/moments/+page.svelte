<script lang="ts">
  export let data: { posts: any[] };
</script>

<h1 class="text-3xl font-bold mb-6">Moments</h1>

<ul class="space-y-2">
  {#each data.posts as post}
    <li>
      <a class="text-blue-600 hover:underline"
         href={`/moments/${post.slug}`}>
        {post.title}
      </a>
    </li>
  {/each}
</ul>
