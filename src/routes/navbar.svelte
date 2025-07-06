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
		<a href="/moments" class:selected={current.startsWith('/moments')}>Moments</a>
		<!-- <a href="/highlights" class:selected={current.startsWith('/highlights')}>Highlights</a>
		<a href="/whoami" class:selected={current.startsWith('/whoami')}>$WhoAmI</a> -->
		<!-- <ThemeToggle class="toggle" /> -->
	</nav>
</header>

<style>
	.navbar {
		position: sticky;
		top: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 1.5rem;
		height: 64px;
		backdrop-filter: blur(10px) saturate(180%);
		background: var(--color-navbar-bg, rgba(255, 255, 255, 0.6));
		border-bottom: 1px solid var(--color-border, #e0e0e0);
		z-index: 1000;
	}

	.brand {
		font-family: var(--font-heading, 'Merriweather', serif);
		font-weight: 700;
		font-size: 1.25rem;
		color: var(--color-text, #001a33);
		letter-spacing: 0.5px;
		text-decoration: none;
		display: flex;
		align-items: baseline;
	}
	.brand .dot {
		color: var(--color-accent, #d95f02);
	}

	.links {
		display: flex;
		gap: 1.5rem;
		align-items: center;
	}
	a {
		font-family: var(--font-body, 'Inter', sans-serif);
		font-weight: 500;
		color: var(--color-text, #001a33);
		text-decoration: none;
		position: relative;
		transition: opacity 0.2s ease;
	}
	a:hover {
		opacity: 0.7;
	}
	a[selected]::after {
		content: '';
		position: absolute;
		left: 0;
		right: 0;
		bottom: -4px;
		height: 2px;
		background: var(--color-accent, #d95f02);
		border-radius: 1px;
	}

	/* narrow screens */
	@media (max-width: 600px) {
		.links {
			gap: 1rem;
		}
	}
</style>
