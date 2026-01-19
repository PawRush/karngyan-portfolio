import { test, expect } from '@playwright/test';

test.describe('Resume Page', () => {
  test('should display resume page with header', async ({ page }) => {
    await page.goto('/resume');
    await expect(page).toHaveTitle(/resume -- gyan prakash karn/);
  });

  test('should display download button', async ({ page }) => {
    await page.goto('/resume');
    const downloadLink = page.locator('a[download]').first();
    await expect(downloadLink).toBeVisible({ timeout: 15000 });
    const href = await downloadLink.getAttribute('href');
    expect(href).toContain('.pdf');
  });

  test('should display resume content area', async ({ page }) => {
    await page.goto('/resume');
    // Check for the resume header text
    await expect(page.locator('h1:has-text("résumé"), h1:has-text("resume")').first()).toBeVisible({ timeout: 15000 });
  });
});
