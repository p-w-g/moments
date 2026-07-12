<script lang="ts">
	export let data: {
		candidates: {
			_id: string;
			title: string;
			isDraft: boolean;
			image: import('$lib/sanity').SanityImage;
		}[];
		missingToken: boolean;
	};

	const devices = [
		{ key: 'mobile', label: 'Mobile', width: 390, height: 844 },
		{ key: 'small-desktop', label: 'Small desktop', width: 1280, height: 800 },
		{ key: '2k-desktop', label: '2K desktop', width: 2560, height: 1440 }
	];

	// Visual card width, same for every device so the row lines up — each
	// iframe is a real browsing context at the device's true viewport size
	// (so vw/vh-based styles resolve correctly inside it), then scaled down
	// to fit here. A plain scaled <div> can't do this: vw/vh resolve against
	// the actual browser viewport, not a transformed element.
	const displayWidth = 320;
</script>

<svelte:head>
	<title>Hero candidates — dev</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="page">
	<h1 class="title">Hero candidates ({data.candidates.length})</h1>

	{#if data.missingToken}
		<p class="notice">
			No <code>SANITY_API_EDITOR_TOKEN</code> set in <code>.env</code> — drafts can't be fetched.
			Create an Editor (read+write) token in Sanity → manage → API, then add it as
			<code>SANITY_API_EDITOR_TOKEN=...</code>.
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
			<div class="devices">
				{#each devices as device (device.key)}
					<div class="device">
						<p class="device-label">{device.label} · {device.width}×{device.height}</p>
						<div
							class="device-frame"
							style="width: {displayWidth}px; height: {(displayWidth / device.width) *
								device.height}px;"
						>
							<iframe
								class="device-iframe"
								src="/dev/heroes/frame/{candidate._id}"
								width={device.width}
								height={device.height}
								loading="lazy"
								title="{candidate.title} — {device.label} preview"
								style="transform: scale({displayWidth / device.width});"
							></iframe>
						</div>
					</div>
				{/each}
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

	.devices {
		display: flex;
		flex-wrap: wrap;
		gap: 16px;
	}

	.device-label {
		font-size: 11px;
		letter-spacing: 0.04em;
		color: rgba(245, 242, 236, 0.5);
		margin: 0 0 6px;
	}

	.device-frame {
		position: relative;
		overflow: hidden;
		border-radius: 4px;
		border: 1px solid rgba(245, 242, 236, 0.12);
	}

	.device-iframe {
		border: 0;
		display: block;
		transform-origin: top left;
	}
</style>
