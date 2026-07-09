import { expect, test } from '@playwright/test';

// Regression guard for a highlight that has both a caption and EXIF data in
// Sanity — checks all three pieces of copy actually render together, not
// their exact wording (that lives in the CMS and will change).
test('a highlight with caption and EXIF renders title, caption, and metadata together', async ({
	page
}) => {
	await page.goto('/highlights/maelaren-sunset');

	const title = page.locator('.caption-title');
	const caption = page.locator('.caption-description');
	const meta = page.locator('.caption-meta');

	await expect(title).toBeVisible();
	await expect(caption).toBeVisible();
	await expect(meta).toBeVisible();

	expect((await title.textContent())?.trim()).not.toBe('');
	expect((await caption.textContent())?.trim()).not.toBe('');
	expect((await meta.textContent())?.trim()).not.toBe('');
});
