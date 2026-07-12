<script lang="ts">
	import { jsonLdScriptTag } from '$lib/jsonLd';
	import { urlFor, type Highlight, type SanityImage } from '$lib/sanity';
	import GalleryImage from '$lib/GalleryImage.svelte';

	export let data: { highlights: Highlight[]; heroImage: SanityImage | null };

	const heroWidths = [640, 1080, 1400, 1920, 2400, 3200];

	// Categories are editor-managed in Studio, not hardcoded — derive the filter
	// chips from whatever categories are actually in use, in their Studio order.
	// A highlight can reference a category that no longer exists (dangling ref),
	// which dereferences to null — filter those out rather than crash.
	$: tagOptions = Array.from(
		new Map(
			data.highlights
				.flatMap((h) => h.tags)
				.filter(Boolean)
				.map((tag) => [tag.slug, tag])
		).values()
	).sort((a, b) => a.order - b.order);

	$: heroImage = data.heroImage;
	$: heroSrc = heroImage ? urlFor(heroImage).width(2400).auto('format').quality(80).url() : null;
	$: heroSrcset = heroImage
		? heroWidths
				.map((w) => `${urlFor(heroImage).width(w).auto('format').quality(80).url()} ${w}w`)
				.join(', ')
		: undefined;
	$: heroAlt = heroImage?.alt ?? '';

	// Selecting more tags narrows the results (intersection), not broadens them —
	// picking two categories finds moments that are both, not either.
	let selectedTags: string[] = [];
	const toggleTag = (tag: string) => {
		selectedTags = selectedTags.includes(tag)
			? selectedTags.filter((t) => t !== tag)
			: [...selectedTags, tag];
	};
	$: visibleHighlights = data.highlights.filter((h) =>
		selectedTags.every((tag) => h.tags.some((t) => t?.slug === tag))
	);

	const description =
		'A working photo journal — cities at odd hours, the animals in them, and the small moments in between.';

	// Sanity image URLs are already absolute; fall back to the first highlight
	// when there's no hero pick yet (e.g. nothing tagged isHero).
	$: firstHighlightImage = data.highlights.find((h) => h.image?.asset)?.image;
	$: ogImage =
		heroSrc ??
		(firstHighlightImage ? urlFor(firstHighlightImage).width(1200).auto('format').url() : null);
	$: jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'ImageGallery',
		name: 'moments',
		description,
		image: [
			...(ogImage ? [ogImage] : []),
			...data.highlights
				.filter((h) => h.image?.asset)
				.map((h) => urlFor(h.image).width(1200).auto('format').url())
		]
	};
	$: jsonLdScript = jsonLdScriptTag(jsonLd);
</script>

<svelte:head>
	<meta name="description" content={description} />
	<meta property="og:title" content="moments — photography" />
	<meta property="og:description" content={description} />
	<meta property="og:type" content="website" />
	{#if ogImage}
		<meta property="og:image" content={ogImage} />
	{/if}
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

		{#if heroSrc}
			<img
				class="hero-image"
				src={heroSrc}
				srcset={heroSrcset}
				sizes="100vw"
				alt={heroAlt}
				loading="eager"
				fetchpriority="high"
				decoding="async"
			/>
		{/if}
		<div class="hero-scrim" aria-hidden="true"></div>

		<div class="hero-content">
			<p class="eyebrow">Travel · Food · Everyday Life</p>
			<h1>Frames from<br />the road.</h1>
			<p class="subcopy">{description}</p>
		</div>

		<a class="scroll-cue" href="#work" aria-label="Scroll to curated moments">
			<span class="scroll-line" aria-hidden="true"></span>
			<span>Scroll</span>
		</a>
	</section>

	<section id="work" class="work">
		<div class="work-header">
			<p class="eyebrow">Curated Moments</p>
			<div class="chips" role="group" aria-label="Narrow by tag">
				<button
					type="button"
					class="chip"
					class:active={selectedTags.length === 0}
					aria-pressed={selectedTags.length === 0}
					on:click={() => (selectedTags = [])}
				>
					All
				</button>
				{#each tagOptions as tag (tag.slug)}
					<button
						type="button"
						class="chip"
						class:active={selectedTags.includes(tag.slug)}
						aria-pressed={selectedTags.includes(tag.slug)}
						on:click={() => toggleTag(tag.slug)}
					>
						{tag.title}
					</button>
				{/each}
			</div>
		</div>

		<div class="masonry">
			{#each visibleHighlights as highlight (highlight._id)}
				<a class="card" href={`/highlights/${highlight.slug}`}>
					<GalleryImage
						image={highlight.image}
						alt={highlight.image?.alt ?? highlight.title}
						sizes="(min-width: 900px) 33vw, (min-width: 560px) 50vw, 100vw"
					/>
					<div class="card-caption">
						<div class="caption-text">{highlight.caption ?? highlight.title}</div>
						<div class="caption-category">
							{highlight.tags
								.filter(Boolean)
								.map((t) => t.title)
								.join(' · ')}
						</div>
					</div>
				</a>
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
		background: var(--bg);
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
		display: block;
		break-inside: avoid;
		margin-bottom: 28px;
		position: relative;
	}

	.card :global(img) {
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
		pointer-events: none;
	}

	.card:hover .card-caption,
	.card:focus-visible .card-caption {
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
