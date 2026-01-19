import { test, expect } from '@playwright/test';

test.describe('Blog Page', () => {
  test('should display blog page with header', async ({ page }) => {
    await page.goto('/blog');
    await expect(page).toHaveTitle(/blog -- gyan prakash karn/);
    await expect(page.locator('text=i try to write once in a while')).toBeVisible();
  });

  test('should display blog post cards', async ({ page }) => {
    await page.goto('/blog');
    // BlogCard uses nuxt-link with rounded-xl class
    const blogCards = page.locator('a.rounded-xl');
    await expect(blogCards.first()).toBeVisible({ timeout: 15000 });
  });

  test('should display category filter buttons', async ({ page }) => {
    await page.goto('/blog');
    await expect(page.locator('button:has-text("all")').first()).toBeVisible({ timeout: 15000 });
    await expect(page.locator('button:has-text("dev")')).toBeVisible();
  });

  test('should navigate to individual blog post', async ({ page }) => {
    await page.goto('/blog');
    // Click on a blog card link
    const blogCard = page.locator('a.rounded-xl').first();
    await expect(blogCard).toBeVisible({ timeout: 15000 });
    await blogCard.click();
    await page.waitForURL('**/blog/**', { timeout: 15000 });
    expect(page.url()).toMatch(/\/blog\/.+/);
  });
});
