import { test, expect } from '@playwright/test';

test.describe('Blog Post Page', () => {
  test('should display blog post content', async ({ page }) => {
    await page.goto('/blog/lorem-ipsum', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('h1:has-text("Lorem Ipsum Devo")')).toBeVisible({ timeout: 15000 });
    await expect(page).toHaveTitle(/Lorem Ipsum Devo/);
  });

  test('should display author information', async ({ page }) => {
    await page.goto('/blog/lorem-ipsum', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('text=karn').first()).toBeVisible({ timeout: 15000 });
  });

  test('should display post metadata', async ({ page }) => {
    await page.goto('/blog/lorem-ipsum', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('text=dev').first()).toBeVisible({ timeout: 15000 });
    await expect(page.locator('text=min').first()).toBeVisible();
  });

  test('should display post tags', async ({ page }) => {
    await page.goto('/blog/lorem-ipsum', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('text=random').first()).toBeVisible({ timeout: 15000 });
    await expect(page.locator('text=lorem').first()).toBeVisible();
  });

  test('should have breadcrumb navigation back to blog', async ({ page }) => {
    await page.goto('/blog/lorem-ipsum', { waitUntil: 'domcontentloaded' });
    const blogLink = page.locator('a:has-text("blog"), a[href="/blog"]').first();
    await expect(blogLink).toBeVisible({ timeout: 15000 });
    await blogLink.click();
    await page.waitForURL('**/blog', { timeout: 15000 });
    expect(page.url()).toContain('/blog');
  });
});
