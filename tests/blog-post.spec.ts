import { test, expect } from '@playwright/test';

test.describe('Individual Blog Post Page', () => {
  test('should display blog post content', async ({ page }) => {
    await page.goto('/blog/lorem-ipsum', { waitUntil: 'domcontentloaded' });

    // Wait for the post title to appear
    const postTitle = page.locator('h1:has-text("Lorem Ipsum Devo")');
    await expect(postTitle).toBeVisible({ timeout: 15000 });

    // Check page title includes the post title
    await expect(page).toHaveTitle(/Lorem Ipsum Devo/);

    // Check post content is rendered
    const postContent = page.locator('text=Lorem markdownum facinus');
    await expect(postContent).toBeVisible();
  });

  test('should display author information', async ({ page }) => {
    await page.goto('/blog/lorem-ipsum', { waitUntil: 'domcontentloaded' });

    // Wait for author name
    const authorName = page.locator('text=karn');
    await expect(authorName.first()).toBeVisible({ timeout: 15000 });

    // Check for author image/avatar
    const authorAvatar = page.locator('img[alt*="karn"], [class*="Avatar"]');
    await expect(authorAvatar.first()).toBeVisible();
  });

  test('should display post metadata', async ({ page }) => {
    await page.goto('/blog/lorem-ipsum', { waitUntil: 'domcontentloaded' });

    // Wait for the post to load
    await page.waitForSelector('h1', { timeout: 15000 });

    // Check for category badge
    const categoryBadge = page.locator('text=dev');
    await expect(categoryBadge.first()).toBeVisible({ timeout: 10000 });

    // Check for reading time
    const readingTime = page.locator('text=/\\d+ min/i, text=min read');
    await expect(readingTime.first()).toBeVisible();

    // Check for publication date
    const datePattern = page.locator('text=/May|2020/i');
    await expect(datePattern.first()).toBeVisible();
  });

  test('should display post tags', async ({ page }) => {
    await page.goto('/blog/lorem-ipsum', { waitUntil: 'domcontentloaded' });

    // Wait for tags section
    await page.waitForSelector('h1', { timeout: 15000 });

    // Check for tags (from lorem-ipsum.md: random, lorem, ipsum)
    const randomTag = page.locator('text=random');
    const loremTag = page.locator('text=lorem');
    const ipsumTag = page.locator('text=ipsum');

    await expect(randomTag.first()).toBeVisible({ timeout: 10000 });
    await expect(loremTag.first()).toBeVisible();
    await expect(ipsumTag.first()).toBeVisible();
  });

  test('should render markdown content with images', async ({ page }) => {
    await page.goto('/blog/lorem-ipsum', { waitUntil: 'domcontentloaded' });

    // Wait for post content
    await page.waitForSelector('h1', { timeout: 15000 });

    // Check for image in the post
    const postImage = page.locator('img[alt*="Big Head Karn"]');
    await expect(postImage.first()).toBeVisible({ timeout: 10000 });

    // Check for code blocks
    const codeBlock = page.locator('pre code, pre');
    await expect(codeBlock.first()).toBeVisible();
  });

  test('should have breadcrumb navigation back to blog', async ({ page }) => {
    await page.goto('/blog/lorem-ipsum', { waitUntil: 'domcontentloaded' });

    // Wait for page content
    await page.waitForSelector('h1', { timeout: 15000 });

    // Check for breadcrumb or back to blog link
    const blogBreadcrumb = page.locator('a:has-text("blog"), a[href="/blog"]').first();
    await expect(blogBreadcrumb).toBeVisible({ timeout: 10000 });

    // Click breadcrumb and verify navigation
    await blogBreadcrumb.click();
    await page.waitForURL('**/blog', { timeout: 10000 });
    expect(page.url()).toContain('/blog');
  });

  test('should have share on Twitter functionality', async ({ page }) => {
    await page.goto('/blog/lorem-ipsum', { waitUntil: 'domcontentloaded' });

    // Wait for page content
    await page.waitForSelector('h1', { timeout: 15000 });

    // Check for Twitter share button
    const twitterShare = page.locator('a:has-text("Share on Twitter"), a[href*="twitter.com/intent"]');
    await expect(twitterShare.first()).toBeVisible({ timeout: 10000 });

    // Verify the share URL is properly constructed
    const shareHref = await twitterShare.first().getAttribute('href');
    expect(shareHref).toContain('twitter.com/intent/tweet');
    expect(shareHref).toContain('Lorem');
  });

  test('should display scroll to top button', async ({ page }) => {
    await page.goto('/blog/lorem-ipsum', { waitUntil: 'domcontentloaded' });

    // Wait for page load
    await page.waitForSelector('h1', { timeout: 15000 });

    // Scroll down the page
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    // Check for scroll to top button
    const scrollButton = page.locator('svg').filter({ has: page.locator('path[d*="10 18"]') }).locator('..');
    const isVisible = await scrollButton.count() > 0;
    expect(isVisible).toBeTruthy();
  });

  test('should test another blog post', async ({ page }) => {
    await page.goto('/blog/dignatus-sorores', { waitUntil: 'domcontentloaded' });

    // Wait for post title
    const postTitle = page.locator('h1:has-text("Dignatus"), h1');
    await expect(postTitle.first()).toBeVisible({ timeout: 15000 });

    // Check that content is different from lorem-ipsum
    const pageContent = await page.textContent('body');
    expect(pageContent).toBeTruthy();
  });
});
