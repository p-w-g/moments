<script>
	import { onMount } from 'svelte';

	export let current = '/'; // active path for aria-current
	let prevScrollPos = 0;
	let navbarTop = '0';
	const threshold = 15; // pixels

	const handleScroll = () => {
		const currentScrollPos = window.pageYOffset;
		const delta = prevScrollPos - currentScrollPos;

		if (delta > threshold) {
			navbarTop = '0';
		} else if (delta < -threshold) {
			// User scrolled down more than threshold
			navbarTop = '-80px';
		}
		prevScrollPos = currentScrollPos;
	};

	onMount(() => {
		prevScrollPos = window.pageYOffset;
		window.addEventListener('scroll', handleScroll);
	});
</script>

<header class="navbar" role="navigation" aria-label="Site" style="top: {navbarTop}">
	<a class="brand" href="/">moments</a>

	<nav class="links">
		<a href="/highlights" class:selected={current.startsWith('/highlights')}>Highlights</a>
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
		position: fixed;
		z-index: 100;
		transition: top 0.3s;
	}

	.brand {
		font-weight: 700;
		text-decoration: none;
	}

	.links {
		display: flex;
		gap: 1.5rem;
	}
	.links a {
		text-decoration: none;
		position: relative;
	}

	.navbar {
		position: sticky;
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
