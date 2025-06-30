<!-- ====================================================================
 ThemeToggle.svelte
 Cycles through three themes: earthsky, kodachrome, monoaccent.
 Applies class to <html>. Small pill toggle styled here.
==================================================================== -->
<script>
	import { onMount } from 'svelte';
	const themes = ['theme-earthsky', 'theme-kodachrome', 'theme-monoaccent'];
	let index = 0;

	// Initialise from existing class on <html>
	onMount(() => {
		const cls = document.documentElement.className.split(/\s+/).find((c) => themes.includes(c));
		if (cls) index = themes.indexOf(cls);
	});

	function cycle() {
		index = (index + 1) % themes.length;
		document.documentElement.classList.remove(...themes);
		document.documentElement.classList.add(themes[index]);
		// persist choice (optional)
		localStorage.setItem('theme', themes[index]);
	}

	// restore persisted choice
	onMount(() => {
		const stored = localStorage.getItem('theme');
		if (stored && themes.includes(stored)) {
			index = themes.indexOf(stored);
			document.documentElement.classList.add(stored);
		}
	});
</script>

<button class="theme-toggle" on:click={cycle} aria-label="Change theme">
	<span class="thumb" style="--i:{index}"></span>
</button>

<style>
	.theme-toggle {
		width: 66px;
		height: 26px;
		background: var(--color-surface, #fff);
		border: 1px solid var(--color-border, #d0d0d0);
		border-radius: 13px;
		padding: 2px;
		display: inline-flex;
		cursor: pointer;
		position: relative;
	}
	.thumb {
		position: absolute;
		top: 2px;
		left: 2px;
		width: 20px;
		height: 20px;
		border-radius: 50%;
		background: var(--color-accent, #d95f02);
		transition: transform 0.25s var(--ease-default, cubic-bezier(0.4, 0, 0.2, 1));
		transform: translateX(calc(var(--i) * 20px));
	}
</style>
