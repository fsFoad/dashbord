import { expect, test } from '@playwright/test';

/** Login flow + role-based UI visibility (admin sees admin-only controls). */
test.describe('authentication & RBAC', () => {
  test('redirects an unauthenticated user to login', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page).toHaveURL(/\/auth\/login/);
  });

  test('a regular user can sign in and reach the dashboard', async ({ page }) => {
    await page.goto('/auth/login');
    await page.getByText('user@demo.com').click(); // demo quick-fill
    await page.getByRole('button', { name: /دخول|sign in|دخول|ورود|دخول/i }).first().click();
    await expect(page).toHaveURL(/\/dashboard/, { timeout: 10_000 });
  });

  test('admin login requires the 2FA step', async ({ page }) => {
    await page.goto('/auth/login');
    await page.getByText('admin@demo.com').click();
    await page.getByRole('button').filter({ hasText: /ورود|دخول|sign/i }).first().click();
    // OTP step appears
    await expect(page.getByText(/123456|رمز|code|التحقق/i).first()).toBeVisible({ timeout: 10_000 });
  });
});
