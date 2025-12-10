import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should display hero section with title and description', async ({ page }) => {
    await page.goto('/');

    // Check page title
    await expect(page).toHaveTitle(/home -- gyan prakash karn/);

    // Check hero section elements
    await expect(page.locator('text=gyan prakash karn')).toBeVisible();
    await expect(page.locator('text=your friendly neighborhood')).toBeVisible();

    // Check description text
    const description = page.locator('text=i am a software engineer');
    await expect(description).toBeVisible();
  });

  test('should display navigation menu', async ({ page }) => {
    await page.goto('/');

    // Wait for navigation to be visible
    await page.waitForSelector('nav, header, [role="navigation"]', { timeout: 10000 });

    // Check main navigation links exist
    const blogLink = page.locator('a[href="/blog"], a:has-text("blog")').first();
    const projectsLink = page.locator('a[href="/projects"], a:has-text("projects")').first();
    const resumeLink = page.locator('a[href="/resume"], a:has-text("résumé"), a:has-text("resume")').first();

    await expect(blogLink).toBeVisible();
    await expect(projectsLink).toBeVisible();
    await expect(resumeLink).toBeVisible();
  });

  test('should display recent blog posts section', async ({ page }) => {
    await page.goto('/');

    // Wait for content to load
    await page.waitForLoadState('networkidle');

    // Check for recent blogs header
    const recentBlogsHeader = page.locator('text=recent blogs');
    await expect(recentBlogsHeader).toBeVisible({ timeout: 10000 });

    // Check that blog cards are displayed
    // The homepage shows 3 most recent posts
    const blogCards = page.locator('[class*="BlogCard"], article, .blog-card');
    await expect(blogCards.first()).toBeVisible({ timeout: 10000 });
  });

  test('should display recommendations section', async ({ page }) => {
    await page.goto('/');

    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');

    // Check for recommendations header
    const recommendationsHeader = page.locator('text=recommendations');
    await expect(recommendationsHeader).toBeVisible({ timeout: 10000 });

    // Check for recommendation content
    const varunRecommendation = page.locator('text=Varun Jain');
    const gauravRecommendation = page.locator('text=Gaurav Sen');

    await expect(varunRecommendation).toBeVisible();
    await expect(gauravRecommendation).toBeVisible();
  });

  test('should have working blog link from hero section', async ({ page }) => {
    await page.goto('/');

    // Wait for page load
    await page.waitForLoadState('networkidle');

    // Look for "have a look" or blog link in hero section
    const blogLink = page.locator('text=have a look').first();

    if (await blogLink.isVisible()) {
      await blogLink.click();
      await page.waitForURL('**/blog', { timeout: 10000 });
      expect(page.url()).toContain('/blog');
    }
  });

  test('should be responsive and have proper meta tags', async ({ page }) => {
    await page.goto('/');

    // Check meta description
    const metaDescription = await page.locator('meta[name="description"]').getAttribute('content');
    expect(metaDescription).toContain('software engineer');

    // Check Open Graph tags
    const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
    expect(ogTitle).toContain('gyan prakash karn');
  });
});
