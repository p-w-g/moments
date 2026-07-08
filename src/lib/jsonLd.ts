// Renders a JSON-LD payload as a <script> tag string for {@html}.
// Lives in a plain .ts file (not .svelte) so it can contain literal
// script-tag markup without confusing Svelte's file-level script-block
// scanner. `<` is escaped so CMS-sourced strings inside the JSON can't
// break out of the tag.
export function jsonLdScriptTag(data: unknown): string {
	const json = JSON.stringify(data).replace(/</g, '\\u003c');
	return `<script type="application/ld+json">${json}</script>`;
}
