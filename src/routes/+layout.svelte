<script>
	import Navbar from './navbar.svelte';
	import '../app.css';
</script>

<Navbar />
<main>
	<slot />
</main>

<style>
	main {
		padding-top: var(--nav-height);
	}
</style>
