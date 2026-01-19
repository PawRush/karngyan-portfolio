import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should display hero section with title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/home -- gyan prakash karn/);
    await expect(page.locator('text=gyan prakash karn')).toBeVisible();
  });

  test('should display navigation menu', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('a[href="/blog"], a:has-text("blog")').first()).toBeVisible();
    await expect(page.locator('a[href="/projects"], a:has-text("projects")').first()).toBeVisible();
    await expect(page.locator('a[href="/resume"], a:has-text("résumé"), a:has-text("resume")').first()).toBeVisible();
  });

  test('should display recent blog posts section', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('text=recent blogs')).toBeVisible({ timeout: 15000 });
  });

  test('should display recommendations section', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('text=recommendations')).toBeVisible({ timeout: 15000 });
  });
});
