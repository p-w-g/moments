<script lang="ts">
	import { urlFor } from '$lib/sanity';

	export let data: {
		candidates: {
			_id: string;
			title: string;
			isDraft: boolean;
			image: import('$lib/sanity').SanityImage;
		}[];
		missingToken: boolean;
	};

	const eyebrow = 'Travel · Food · Everyday Life';
	const subcopy =
		'A working photo journal — cities at odd hours, the animals in them, and the small moments in between.';
</script>

<svelte:head>
	<title>Hero candidates — dev</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="page">
	<h1 class="title">Hero candidates ({data.candidates.length})</h1>

	{#if data.missingToken}
		<p class="notice">
			No <code>SANITY_API_READ_TOKEN</code> set in <code>.env</code> — drafts can't be fetched.
			Create a Viewer token in Sanity → manage → API, then add it as
			<code>SANITY_API_READ_TOKEN=...</code>.
		</p>
	{:else if data.candidates.length === 0}
		<p class="notice">
			No highlights have "Hero eligible" ticked yet — including drafts. Tick it in studio and
			reload.
		</p>
	{/if}

	{#each data.candidates as candidate (candidate._id)}
		<section class="candidate">
			<div class="label">
				<span>{candidate.title}</span>
				{#if candidate.isDraft}<span class="badge">draft</span>{/if}
			</div>
			<div class="hero">
				{#if candidate.image?.asset}
					<img
						class="hero-image"
						src={urlFor(candidate.image).width(2400).auto('format').quality(80).url()}
						alt={candidate.image.alt ?? ''}
						loading="lazy"
					/>
				{/if}
				<div class="hero-scrim" aria-hidden="true"></div>
				<div class="hero-content">
					<p class="eyebrow">{eyebrow}</p>
					<h2>Frames from<br />the road.</h2>
					<p class="subcopy">{subcopy}</p>
				</div>
			</div>
		</section>
	{/each}
</div>

<style>
	.page {
		background: #0e0d0c;
		color: #f5f2ec;
		font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Arial, sans-serif;
		padding: 24px;
	}

	.title {
		font-size: 20px;
		margin: 0 0 8px;
	}

	.notice {
		color: #d98a3d;
		font-size: 14px;
		max-width: 640px;
	}

	.notice code {
		background: rgba(245, 242, 236, 0.1);
		padding: 1px 5px;
		border-radius: 3px;
	}

	.candidate {
		margin-top: 24px;
	}

	.label {
		display: flex;
		align-items: center;
		gap: 10px;
		font-size: 13px;
		letter-spacing: 0.04em;
		color: rgba(245, 242, 236, 0.7);
		margin-bottom: 8px;
	}

	.badge {
		font-size: 11px;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: #0e0d0c;
		background: #d98a3d;
		padding: 2px 8px;
		border-radius: 999px;
	}

	.hero {
		position: relative;
		width: 100%;
		height: 90vh;
		min-height: 560px;
		overflow: hidden;
		border-radius: 4px;
	}

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
		bottom: 56px;
		max-width: 640px;
	}

	.eyebrow {
		font-size: 13px;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: #d98a3d;
		margin: 0;
	}

	.hero-content h2 {
		margin: 18px 0 0;
		font-size: clamp(40px, 6vw, 84px);
		line-height: 1.03;
		font-weight: 400;
		letter-spacing: -0.01em;
		color: #f5f2ec;
	}

	.hero-content .subcopy {
		margin: 20px 0 0;
		font-size: 17px;
		line-height: 1.6;
		color: rgba(245, 242, 236, 0.68);
		max-width: 440px;
	}
</style>
