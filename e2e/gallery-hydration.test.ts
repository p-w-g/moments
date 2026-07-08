import { expect, test } from '@playwright/test';

// Regression test for a hydration race: on a hard refresh the browser can
// finish loading the SSR-rendered thumbnail (often instantly, from cache)
// before hydration attaches the on:load listener, so the "loaded" class
// never lands and the image stays stuck behind its blur placeholder.
test('gallery thumbnails are not stuck behind their blur placeholder after a refresh', async ({
	page
}) => {
	await page.goto('/');
	const firstImage = page.locator('.full').first();
	await expect(firstImage).toHaveClass(/loaded/, { timeout: 10000 });

	await page.reload();
	await expect(firstImage).toHaveClass(/loaded/, { timeout: 10000 });
});
