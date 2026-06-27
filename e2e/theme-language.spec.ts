import { expect, test } from '@playwright/test';

async function login(page: import('@playwright/test').Page) {
  await page.goto('/auth/login');
  await page.getByText('user@demo.com').click();
  await page.getByRole('button').filter({ hasText: /ورود|دخول|sign/i }).first().click();
  await expect(page).toHaveURL(/\/dashboard/, { timeout: 10_000 });
}

test.describe('theme & language', () => {
  test('html dir is RTL by default (Persian)', async ({ page }) => {
    await login(page);
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  });

  test('dark mode toggles the app-dark class', async ({ page }) => {
    await login(page);
    const html = page.locator('html');
    const before = await html.getAttribute('class');
    // toggle via command palette is most reliable
    await page.keyboard.press('Control+KeyK');
    await page.keyboard.type('dark');
    await page.keyboard.press('Enter');
    await expect(html).not.toHaveClass(before ?? '');
  });
});
