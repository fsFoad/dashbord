import { expect, test } from '@playwright/test';
test('kanban board loads with columns', async ({ page }) => {
    await page.goto('/auth/login');
    await page.getByText('user@demo.com').click();
    await page.getByRole('button').filter({ hasText: /ورود|دخول|sign/i }).first().click();
    await expect(page).toHaveURL(/\/dashboard/, { timeout: 10_000 });
    await page.goto('/projects/board');
    // three columns rendered (todo / doing / done)
    await expect(page.locator('section')).toHaveCount(3, { timeout: 10_000 });
});
