<script>
	import { onMount } from 'svelte';

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
	<a class="back" href="/#work">← Work</a>
</header>

<style>
	.navbar {
		position: fixed;
		inset-inline: 0;
		top: 0;
		z-index: 100;
		display: flex;
		align-items: center;
		height: var(--nav-height);
		padding-inline: var(--space-6);
		background: var(--frost-fill);
		backdrop-filter: blur(var(--frost-blur));
		transition: transform var(--transition-base);
	}

	.navbar.hidden {
		transform: translateY(-100%);
	}

	.back {
		font-family: var(--font-body);
		font-weight: 500;
		color: var(--color-text);
		transition: opacity var(--transition-fast);
	}

	.back:hover,
	.back:focus-visible {
		opacity: 0.7;
		text-decoration: none;
	}

	@media (prefers-reduced-motion: reduce) {
		.navbar {
			transition: none;
		}
	}
</style>
