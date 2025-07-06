<script>
	import Navbar from './navbar.svelte';
	import '../app.css';
</script>

<Navbar />
<main class="flex-1 p-6">
	<slot />
</main>
