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

	// The landing page has its own overlay nav (see +page.svelte's hero), the
	// error page has its own "back to moments" link, and hero frame previews
	// are meant to fill an iframe at an exact device viewport size with zero
	// chrome — the sitewide frosted Navbar (a highlight-page "back to work"
	// control) would be a non-sequitur on any of them, so it's scoped to
	// just the highlight route.
	$: isLanding = $page.url.pathname === '/';
	$: isHeroFrame = $page.url.pathname.startsWith('/dev/heroes/frame/');
	$: showNavbar = !isLanding && !isHeroFrame && !$page.error;
</script>

{#if showNavbar}
	<Navbar />
{/if}
<main class:landing={!showNavbar}>
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
