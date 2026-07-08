<script>
	import { page } from '$app/stores';
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

	// The landing page has its own overlay nav (see +page.svelte's hero),
	// so the sitewide frosted Navbar only applies to other routes.
	$: isLanding = $page.url.pathname === '/';
</script>

{#if !isLanding}
	<Navbar />
{/if}
<main class:landing={isLanding}>
	<slot />
</main>

<style>
	main {
		padding-top: var(--nav-height);
	}

	main.landing {
		padding-top: 0;
	}

	:global(::view-transition-old(root)),
	:global(::view-transition-new(root)) {
		animation-duration: var(--transition-base);
	}
</style>
