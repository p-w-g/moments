import { expect, test } from '@playwright/test';

// SvelteKit renders +error.svelte for every HTTP error status, so a 404 on
// an unmatched route exercises the same friendly error page a real 500
// (e.g. a misconfigured Sanity env var) would fall back to.
test('an unknown route renders the friendly error page, not a bare crash', async ({ page }) => {
	const response = await page.goto('/this-route-does-not-exist');
	expect(response?.status()).toBe(404);

	await expect(page.locator('.status')).toHaveText('404');
	await expect(page.getByRole('link', { name: '← Back to moments' })).toBeVisible();

	const navbar = page.locator('.navbar');
	await expect(navbar).toHaveCount(0);
});
