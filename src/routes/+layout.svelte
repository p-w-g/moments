<script>
	import { onNavigate } from '$app/navigation';
	import Navbar from './navbar.svelte';
	import '../app.css';

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<Navbar />
<main>
	<slot />
</main>

<style>
	main {
		padding-top: var(--nav-height);
	}

	:global(::view-transition-old(root)),
	:global(::view-transition-new(root)) {
		animation-duration: var(--transition-base);
	}
</style>
