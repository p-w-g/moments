<script lang="ts">
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>{$page.status} — moments</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="error-page">
	<p class="status">{$page.status}</p>
	<h1>{$page.status === 404 ? 'Page not found.' : 'Something went wrong.'}</h1>
	<p class="message">{$page.error?.message}</p>
	<a href="/">← Back to moments</a>
</div>

<style>
	.error-page {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		padding: var(--space-6);
	}

	.status {
		font-family: var(--font-heading);
		font-size: 0.9rem;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--color-muted);
		margin: 0 0 var(--space-2);
	}

	.message {
		color: var(--color-muted);
		max-width: 32rem;
	}
</style>
