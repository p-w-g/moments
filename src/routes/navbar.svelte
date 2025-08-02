<script>
	// import ThemeToggle from './ThemeToggle.svelte';
	export let current = '/'; // active path for aria-current
	// import { page } from '$app/state';

	// $: heroMode = $page.data?.hero || $page.url.pathname === '/';
	// $: navClasses = heroMode ? 'on-hero' : 'on-body';
</script>

<header class="navbar" role="navigation" aria-label="Site">
	<input id="nav-toggle" type="checkbox" class="nav-toggle" />

	<a class="brand" href="/">moments</a>

	<label for="nav-toggle" class="burger" aria-label="Menu">
		<svg
			viewBox="0 0 20 14"
			stroke="currentColor"
			stroke-width="2"
			fill="none"
			stroke-linecap="round"
		>
			<path d="M1 1h18" />
			<path d="M1 7h18" />
			<path d="M1 13h18" />
		</svg>
	</label>

	<nav class="links">
		<a href="/travelogue" class:selected={current.startsWith('/travelogue')}>Travelogue</a>
		<a href="/highlights" class:selected={current.startsWith('/highlights')}>Highlights</a>
		<!-- <a href="/whoami" class:selected={current.startsWith('/whoami')}>$WhoAmI</a> -->
	</nav>
</header>

<style>
	.navbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 72px;
		padding-inline: 1.25rem;
		background: var(--paper);
		color: var(--ink);
		position: relative;
		z-index: 100;
	}

	.brand {
		font-weight: 700;
		text-decoration: none;
	}

	.nav-toggle {
		position: absolute;
		inset: 0;
		opacity: 0;
		pointer-events: none;
	}

	.burger {
		display: inline-flex;
		cursor: pointer;
		user-select: none;
	}
	@media (min-width: 768px) {
		.burger {
			display: none;
		}
	}
	.links {
		display: flex;
		gap: 1.5rem;
	}
	.links a {
		text-decoration: none;
		position: relative;
	}

	@media (max-width: 767px) {
		.links {
			position: absolute;
			top: 72px;
			left: 0;
			right: 0;
			flex-direction: column;
			background: var(--paper);
			padding: 1rem 1.25rem;
			max-height: 0;
			overflow: hidden;
			transition: max-height 0.35s ease;
		}

		.nav-toggle:checked + .brand + .burger + .links {
			max-height: 240px;
		}
	}
	.navbar {
		position: sticky;
		top: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 1.5rem;
		height: 64px;
		backdrop-filter: blur(10px) saturate(180%);
		background: var(--color-navbar-bg, rgb(255 255 255 / 60%));
		z-index: 1000;

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

		.links {
			display: flex;
			gap: 1.5rem;
			align-items: center;
		}

		a {
			font-family: var(--font-body, 'Inter', sans-serif);
			font-weight: 500;
			color: #001a33;
			text-decoration: none;
			position: relative;
			transition: opacity 0.2s ease;
		}

		a:hover {
			opacity: 0.7;
		}

		@media (width <= 600px) {
			.links {
				gap: 1rem;
			}
		}
	}
</style>
