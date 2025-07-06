<!-- ====================================================================
 Navbar.svelte
 Frosted-glass header with brand + two nav links + three‑way ThemeToggle.
 Scoped styles only—no reliance on global CSS. Uses CSS variables already
 defined on <html> by the selected theme class.
==================================================================== -->
<script>
	// import ThemeToggle from './ThemeToggle.svelte';
	export let current = '/'; // active path for aria-current
</script>

<header class="navbar" role="navigation" aria-label="Site">
	<a href="/" class="brand">moments</a>

	<nav class="links">
		<a href="/travelogue" class:selected={current.startsWith('/travelogue')}>Travelogue</a>
		<!-- <a href="/highlights" class:selected={current.startsWith('/highlights')}>Highlights</a>
		<a href="/whoami" class:selected={current.startsWith('/whoami')}>$WhoAmI</a> -->
		<!-- <ThemeToggle class="toggle" /> -->
	</nav>
</header>
