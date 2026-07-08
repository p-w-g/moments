import { expect, test } from '@playwright/test';

// Runs against the real Sanity dataset (see ci.yml) to catch a studio
// schema/query change that breaks moments before it reaches master —
// e.g. a renamed field or a slug that no longer resolves.
test('homepage gallery renders real Sanity content and links through to a highlight', async ({
	page
}) => {
	await page.goto('/');

	const cards = page.locator('.card');
	await expect(cards.first()).toBeVisible();
	expect(await cards.count()).toBeGreaterThan(0);

	await cards.first().click();
	await expect(page).toHaveURL(/\/highlights\/.+/);
	await expect(page.locator('img').first()).toBeVisible();
});
