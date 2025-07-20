<script>
	import Navbar from './navbar.svelte';
	import '../app.css';
	// import { page } from '$app/state';

	// $: heroMode = page.url.pathname === '/';
	// $: heroMode = $page.data?.hero || $page.url.pathname === '/';
	// $: wrapperClasses = heroMode ? 'frame' : ''; // add more if needed
</script>

<!-- <div class={wrapperClasses}> -->
<div class={''}>
	<Navbar />
	<main class="flex-1 p-6">
		<slot />
	</main>
</div>
