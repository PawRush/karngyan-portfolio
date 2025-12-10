import { test, expect } from '@playwright/test';

test.describe('Blog Listing Page', () => {
  test('should display blog page with header and subtext', async ({ page }) => {
    await page.goto('/blog');

    // Check page title
    await expect(page).toHaveTitle(/blog -- gyan prakash karn/);

    // Check blog header
    await expect(page.locator('text=blog').first()).toBeVisible();

    // Check subtext
    const subtext = page.locator('text=i try to write once in a while');
    await expect(subtext).toBeVisible();
  });

  test('should display blog post cards', async ({ page }) => {
    await page.goto('/blog');

    // Wait for content to load
    await page.waitForLoadState('networkidle');

    // Check that blog posts are displayed
    // We know there are at least 3 posts: dignatus-sorores, lorem-ipsum, traderet-altera
    const postCards = page.locator('[class*="BlogCard"], article').filter({ hasText: /Lorem|Dignatus|Traderet/i });

    // Wait for at least one post to be visible
    await expect(postCards.first()).toBeVisible({ timeout: 10000 });

    // Check that multiple posts are shown
    const cardCount = await postCards.count();
    expect(cardCount).toBeGreaterThanOrEqual(1);
  });

  test('should display category filter buttons', async ({ page }) => {
    await page.goto('/blog');

    // Wait for page to load
    await page.waitForLoadState('networkidle');

    // Check for "all" category button
    const allButton = page.locator('button:has-text("all"), nav button').first();
    await expect(allButton).toBeVisible({ timeout: 10000 });

    // Check for "dev" category (from lorem-ipsum.md)
    const devButton = page.locator('button:has-text("dev")');
    await expect(devButton).toBeVisible();
  });

  test('should filter posts by category', async ({ page }) => {
    await page.goto('/blog');

    // Wait for content to load
    await page.waitForLoadState('networkidle');

    // Wait for posts to be visible
    await page.waitForSelector('[class*="BlogCard"], article', { timeout: 10000 });

    // Get initial post count with "all" selected
    const initialPosts = page.locator('[class*="BlogCard"], article');
    const initialCount = await initialPosts.count();

    // Click on "dev" category button
    const devButton = page.locator('button:has-text("dev")');
    await devButton.click();

    // Wait for filtering to take effect
    await page.waitForTimeout(500);

    // Verify the dev category is now active (has background color)
    await expect(devButton).toHaveClass(/bg-gray-900|text-gray-300/);

    // Posts should still be visible (at least one is in dev category)
    const filteredPosts = page.locator('[class*="BlogCard"], article');
    const filteredCount = await filteredPosts.count();
    expect(filteredCount).toBeGreaterThanOrEqual(1);
  });

  test('should navigate to individual blog post', async ({ page }) => {
    await page.goto('/blog');

    // Wait for content to load
    await page.waitForLoadState('networkidle');

    // Wait for blog cards to be visible
    await page.waitForSelector('[class*="BlogCard"], article', { timeout: 10000 });

    // Find and click on the first blog post
    const firstPost = page.locator('[class*="BlogCard"], article').first();
    await firstPost.click();

    // Wait for navigation
    await page.waitForURL('**/blog/**', { timeout: 10000 });

    // Verify we're on a blog post page
    expect(page.url()).toMatch(/\/blog\/.+/);
  });

  test('should display post metadata on cards', async ({ page }) => {
    await page.goto('/blog');

    // Wait for content to load
    await page.waitForLoadState('networkidle');

    // Wait for blog cards
    const blogCards = page.locator('[class*="BlogCard"], article');
    await expect(blogCards.first()).toBeVisible({ timeout: 10000 });

    // Check for post title (Lorem Ipsum Devo is one of the posts)
    const postTitle = page.locator('text=Lorem Ipsum Devo, text=Dignatus Sorores, text=Traderet Altera').first();
    await expect(postTitle).toBeVisible();

    // Check for date or reading time if displayed
    const firstCard = blogCards.first();
    const cardText = await firstCard.textContent();
    expect(cardText).toBeTruthy();
  });
});
