<script lang="ts">
	import { page } from '$app/stores';
	import { jsonLdScriptTag } from '$lib/jsonLd';

	type Category = 'all' | 'travel' | 'animals' | 'life';

	type Photo = {
		id: string;
		src: string;
		alt: string;
		caption: string;
		category: Exclude<Category, 'all'>;
		categoryLabel: string;
	};

	type EmptySlot = {
		id: string;
		category: Exclude<Category, 'all'>;
		placeholder: string;
		height: number;
	};

	const heroImage = '/landing/hero-rain-bridge.jpg';

	// Static seed content per the design handoff — swap for a CMS-driven fetch
	// once the Sanity "highlight" schema grows a category field.
	const photos: Photo[] = [
		{
			id: 'travel-1',
			src: '/landing/travel-golden-hour.jpg',
			alt: 'Golden-hour street crossing, Osaka',
			caption: 'Osaka, golden hour',
			category: 'travel',
			categoryLabel: 'Travel'
		},
		{
			id: 'animals-1',
			src: '/landing/animal-cat-portrait.jpg',
			alt: 'Grey longhair cat portrait',
			caption: 'A quiet Tuesday',
			category: 'animals',
			categoryLabel: 'Animals'
		},
		{
			id: 'life-1',
			src: '/landing/life-neon-market.jpg',
			alt: 'Neon shop sign, night market',
			caption: 'Night market glow',
			category: 'life',
			categoryLabel: 'Slice of Life'
		},
		{
			id: 'travel-2',
			src: '/landing/travel-blue-hour.jpg',
			alt: 'Blue-hour street silhouette',
			caption: 'Blue hour, backstreets',
			category: 'travel',
			categoryLabel: 'Travel'
		}
	];

	const emptySlots: EmptySlot[] = [
		{
			id: 'slot-animals-2',
			category: 'animals',
			placeholder: 'Drop another animal photo',
			height: 340
		},
		{
			id: 'slot-life-2',
			category: 'life',
			placeholder: 'Drop another slice-of-life photo',
			height: 260
		}
	];

	const categories: { key: Category; label: string }[] = [
		{ key: 'all', label: 'All' },
		{ key: 'travel', label: 'Travel' },
		{ key: 'animals', label: 'Animals' },
		{ key: 'life', label: 'Slice of Life' }
	];

	let activeCategory: Category = 'all';
	$: visiblePhotos = photos.filter(
		(p) => activeCategory === 'all' || p.category === activeCategory
	);
	$: visibleSlots = emptySlots.filter(
		(s) => activeCategory === 'all' || s.category === activeCategory
	);

	const description =
		'A working photo journal — cities at odd hours, the animals in them, and the small moments in between.';

	$: ogImage = new URL(heroImage, $page.url.origin).toString();
	$: jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'ImageGallery',
		name: 'moments',
		description,
		image: [heroImage, ...photos.map((p) => p.src)].map((src) =>
			new URL(src, $page.url.origin).toString()
		)
	};
	$: jsonLdScript = jsonLdScriptTag(jsonLd);
</script>

<svelte:head>
	<meta name="description" content={description} />
	<meta property="og:title" content="moments — photography" />
	<meta property="og:description" content={description} />
	<meta property="og:type" content="website" />
	<meta property="og:image" content={ogImage} />
	<meta name="twitter:card" content="summary_large_image" />
	<!-- eslint-disable-next-line svelte/no-at-html-tags -- jsonLdScript is built from JSON.stringify with `<` escaped, not raw markup -->
	{@html jsonLdScript}
</svelte:head>

<div class="landing">
	<section class="hero">
		<nav class="nav" aria-label="Site">
			<a class="brand" href="/">MOMENTS</a>
			<!--
				Work / Travel / Animals / Life links and the Shop Prints pill are
				commented out until there's enough content to justify them —
				revisit around ~50 photos.
				<div class="nav-links">
					<a href="#work">Work</a>
					<span>Travel</span>
					<span>Animals</span>
					<span>Life</span>
					<span class="shop-pill">Shop Prints</span>
				</div>
			-->
		</nav>

		<img
			class="hero-image"
			src={heroImage}
			alt="Rain-slicked pedestrian bridge at night, Osaka"
			loading="eager"
			fetchpriority="high"
			decoding="async"
		/>
		<div class="hero-scrim" aria-hidden="true"></div>

		<div class="hero-content">
			<p class="eyebrow">Travel · Animals · Everyday Life</p>
			<h1>Frames from<br />the road.</h1>
			<p class="subcopy">{description}</p>
		</div>

		<a class="scroll-cue" href="#work" aria-label="Scroll to selected work">
			<span class="scroll-line" aria-hidden="true"></span>
			<span>Scroll</span>
		</a>
	</section>

	<section id="work" class="work">
		<div class="work-header">
			<p class="eyebrow">Selected Work</p>
			<div class="chips" role="group" aria-label="Filter by category">
				{#each categories as cat (cat.key)}
					<button
						type="button"
						class="chip"
						class:active={activeCategory === cat.key}
						aria-pressed={activeCategory === cat.key}
						on:click={() => (activeCategory = cat.key)}
					>
						{cat.label}
					</button>
				{/each}
			</div>
		</div>

		<div class="masonry">
			{#each visiblePhotos as photo (photo.id)}
				<div class="card">
					<img src={photo.src} alt={photo.alt} loading="lazy" decoding="async" />
					<div class="card-caption">
						<div class="caption-text">{photo.caption}</div>
						<div class="caption-category">{photo.categoryLabel}</div>
					</div>
				</div>
			{/each}
			{#each visibleSlots as slot (slot.id)}
				<div class="card slot" style:height={`${slot.height}px`}>
					{slot.placeholder}
				</div>
			{/each}
		</div>
	</section>

	<footer class="footer">
		<div class="copyright">© 2026 Moments. Prints available soon.</div>
		<div class="footer-links">
			<span>Instagram</span>
			<span>Contact</span>
		</div>
	</footer>
</div>

<style>
	.landing {
		--bg: #0e0d0c;
		--fg: #f5f2ec;
		--accent: #d98a3d;
		background: var(--bg);
		color: var(--fg);
		font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Arial, sans-serif;
	}

	.eyebrow {
		font-size: 13px;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--accent);
		margin: 0;
	}

	/* Hero -------------------------------------------------------------- */
	.hero {
		position: relative;
		width: 100%;
		height: 100vh;
		min-height: 680px;
		overflow: hidden;
	}

	.nav {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		z-index: 10;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 30px 48px;
	}

	.brand {
		font-size: 19px;
		font-weight: 700;
		letter-spacing: 0.14em;
		color: var(--fg);
		text-decoration: none;
	}

	/* .nav-links, .shop-pill: paired with the commented-out nav markup above —
	   reinstate both together once there's enough content for a full nav.
	.nav-links {
		display: flex;
		align-items: center;
		gap: 36px;
	}

	.nav-links a,
	.nav-links span {
		font-size: 13px;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--fg);
		text-decoration: none;
	}

	.shop-pill {
		font-size: 12px !important;
		letter-spacing: 0.08em;
		color: var(--accent) !important;
		border: 1px solid var(--accent);
		border-radius: 999px;
		padding: 8px 18px;
		transition:
			background var(--transition-fast, 150ms ease),
			color var(--transition-fast, 150ms ease);
	}

	.shop-pill:hover {
		background: var(--accent);
		color: var(--bg) !important;
	}
	*/

	.hero-image {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center 30%;
	}

	.hero-scrim {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			180deg,
			rgba(14, 13, 12, 0.25) 0%,
			rgba(14, 13, 12, 0.05) 32%,
			rgba(14, 13, 12, 0.85) 100%
		);
	}

	.hero-content {
		position: absolute;
		left: 48px;
		right: 48px;
		bottom: 88px;
		max-width: 640px;
	}

	.hero-content h1 {
		margin: 18px 0 0;
		font-size: clamp(40px, 6vw, 84px);
		line-height: 1.03;
		font-weight: 400;
		letter-spacing: -0.01em;
		color: var(--fg);
	}

	.hero-content .subcopy {
		margin: 20px 0 0;
		font-size: 17px;
		line-height: 1.6;
		color: rgba(245, 242, 236, 0.68);
		max-width: 440px;
	}

	.scroll-cue {
		position: absolute;
		left: 50%;
		bottom: 28px;
		transform: translateX(-50%);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 6px;
		text-decoration: none;
		font-size: 11px;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: rgba(245, 242, 236, 0.6);
		animation: scroll-bounce 2.2s ease-in-out infinite;
	}

	.scroll-line {
		width: 1px;
		height: 34px;
		background: rgba(245, 242, 236, 0.5);
	}

	@keyframes scroll-bounce {
		0%,
		100% {
			transform: translate(-50%, 0);
			opacity: 0.55;
		}
		50% {
			transform: translate(-50%, 8px);
			opacity: 1;
		}
	}

	/* Work / masonry ------------------------------------------------------ */
	.work {
		padding: 120px 48px 40px;
	}

	.work-header {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 24px;
		margin-bottom: 44px;
	}

	.chips {
		display: flex;
		gap: 10px;
		flex-wrap: wrap;
	}

	.chip {
		font: inherit;
		font-size: 12px;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		padding: 9px 18px;
		border-radius: 999px;
		border: 1px solid rgba(245, 242, 236, 0.22);
		background: transparent;
		color: rgba(245, 242, 236, 0.7);
		cursor: pointer;
		transition:
			border-color var(--transition-fast, 150ms ease),
			color var(--transition-fast, 150ms ease);
	}

	.chip:hover,
	.chip.active {
		border-color: rgba(245, 242, 236, 0.55);
		color: var(--fg);
	}

	.masonry {
		column-count: 3;
		column-gap: 28px;
	}

	@media (max-width: 900px) {
		.masonry {
			column-count: 2;
		}
	}

	@media (max-width: 560px) {
		.masonry {
			column-count: 1;
		}
	}

	.card {
		break-inside: avoid;
		margin-bottom: 28px;
		position: relative;
	}

	.card img {
		width: 100%;
		height: auto;
		display: block;
		border-radius: 2px;
	}

	.card-caption {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		padding: 20px 18px;
		background: linear-gradient(0deg, rgba(14, 13, 12, 0.82), rgba(14, 13, 12, 0));
		opacity: 0;
		transition: opacity 0.25s;
	}

	.card:hover .card-caption,
	.card:focus-within .card-caption {
		opacity: 1;
	}

	.caption-text {
		font-size: 14px;
		color: var(--fg);
	}

	.caption-category {
		font-size: 11px;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--accent);
		margin-top: 4px;
	}

	.card.slot {
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		padding: 16px;
		border-radius: 2px;
		border: 1px dashed rgba(245, 242, 236, 0.22);
		color: rgba(245, 242, 236, 0.4);
		font-size: 13px;
	}

	/* Footer ---------------------------------------------------------------- */
	.footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 16px;
		padding: 32px 48px;
		border-top: 1px solid rgba(245, 242, 236, 0.12);
	}

	.copyright {
		font-size: 12px;
		color: rgba(245, 242, 236, 0.45);
	}

	.footer-links {
		display: flex;
		gap: 24px;
	}

	.footer-links span {
		font-size: 12px;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: rgba(245, 242, 236, 0.55);
	}

	@media (prefers-reduced-motion: reduce) {
		.scroll-cue {
			animation: none;
		}
	}

	@media (max-width: 640px) {
		.nav,
		.hero-content,
		.work,
		.footer {
			padding-left: 24px;
			padding-right: 24px;
		}

		.hero-content {
			left: 24px;
			right: 24px;
		}

		.nav {
			flex-wrap: wrap;
			row-gap: 12px;
		}

		/* Paired with the commented-out .nav-links markup above.
		.nav-links {
			flex-wrap: wrap;
			gap: 14px 18px;
		}
		*/
	}
</style>
