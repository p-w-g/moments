<script>
	import { page } from '$app/stores';
	import Navbar from './navbar.svelte';
	import '../app.css';
</script>

<Navbar current={$page.url.pathname} />
<main>
	<slot />
</main>

<style>
	main {
		padding-top: var(--nav-height);
	}
</style>
