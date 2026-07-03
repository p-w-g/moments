<script>
	import { onMount } from 'svelte';

	export let current = '/'; // active path for aria-current

	let hidden = false;
	let prevScrollPos = 0;
	const threshold = 15; // pixels, avoids twitchy toggling on tiny scroll jitter

	const handleScroll = () => {
		const currentScrollPos = window.scrollY;
		const delta = currentScrollPos - prevScrollPos;

		if (currentScrollPos < threshold) {
			hidden = false;
		} else if (delta > threshold) {
			hidden = true; // scrolling down → get out of the way of the photograph
		} else if (delta < -threshold) {
			hidden = false; // scrolling up → bring the nav back
		}
		prevScrollPos = currentScrollPos;
	};

	onMount(() => {
		prevScrollPos = window.scrollY;
		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	});
</script>

<header class="navbar" role="navigation" aria-label="Site" class:hidden>
	<a class="brand" href="/">moments</a>

	<nav class="links">
		<a
			href="/highlights"
			class:selected={current.startsWith('/highlights')}
			aria-current={current.startsWith('/highlights') ? 'page' : undefined}
		>
			Highlights
		</a>
	</nav>
</header>

<style>
	.navbar {
		position: fixed;
		inset-inline: 0;
		top: 0;
		z-index: 100;
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: var(--nav-height);
		padding-inline: var(--space-6);
		background: var(--frost-fill);
		backdrop-filter: blur(var(--frost-blur));
		transition: transform var(--transition-base);
	}

	.navbar.hidden {
		transform: translateY(-100%);
	}

	.brand {
		font-family: var(--font-heading);
		font-weight: 700;
		font-size: 1.15rem;
		letter-spacing: 0.02em;
		color: var(--color-text);
	}

	.links {
		display: flex;
		gap: var(--space-6);
	}

	.links a {
		font-family: var(--font-body);
		font-weight: 500;
		color: var(--color-text);
		position: relative;
		transition: opacity var(--transition-fast);
	}

	.links a:hover {
		opacity: 0.7;
		text-decoration: none;
	}

	.links a.selected {
		opacity: 1;
	}

	.links a.selected::after {
		content: '';
		position: absolute;
		left: 0;
		right: 0;
		bottom: -4px;
		height: 1px;
		background: currentColor;
	}

	@media (prefers-reduced-motion: reduce) {
		.navbar {
			transition: none;
		}
	}
</style>
