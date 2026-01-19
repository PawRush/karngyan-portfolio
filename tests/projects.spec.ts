import { test, expect } from '@playwright/test';

test.describe('Projects Page', () => {
  test('should display projects page with header', async ({ page }) => {
    await page.goto('/projects');
    await expect(page).toHaveTitle(/projects -- gyan prakash karn/);
    await expect(page.locator('text=this page lists some of my personal and work projects')).toBeVisible();
  });

  test('should display project cards', async ({ page }) => {
    await page.goto('/projects');
    // Look for tech stack text that appears in project cards
    await expect(page.locator('text=nuxt').first()).toBeVisible({ timeout: 15000 });
  });

  test('should display tech filter buttons', async ({ page }) => {
    await page.goto('/projects');
    await expect(page.locator('button:has-text("all")').first()).toBeVisible({ timeout: 15000 });
  });

  test('should filter projects by technology', async ({ page }) => {
    await page.goto('/projects');
    const techButton = page.locator('button:has-text("tailwindcss")').first();
    await expect(techButton).toBeVisible({ timeout: 15000 });
    await techButton.click();
    // After filtering, nuxt text should still be visible (karngyan.com uses both)
    await expect(page.locator('text=nuxt').first()).toBeVisible({ timeout: 15000 });
  });
});
