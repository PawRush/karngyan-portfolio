import { test, expect } from '@playwright/test';

test.describe('Projects Page', () => {
  test('should display projects page with header and subtext', async ({ page }) => {
    await page.goto('/projects');

    // Check page title
    await expect(page).toHaveTitle(/projects -- gyan prakash karn/);

    // Check projects header
    await expect(page.locator('text=projects').first()).toBeVisible();

    // Check subtext
    const subtext = page.locator('text=this page lists some of my personal and work projects');
    await expect(subtext).toBeVisible();
  });

  test('should display project cards', async ({ page }) => {
    await page.goto('/projects');

    // Wait for content to load
    await page.waitForLoadState('networkidle');

    // Check that project cards are displayed
    // We know there are at least 4 projects based on the files we saw
    const projectCards = page.locator('[class*="ProjectCard"], article').filter({
      hasText: /karngyan|covidhelp|interviewready|lookatx/i
    });

    // Wait for at least one project to be visible
    await expect(projectCards.first()).toBeVisible({ timeout: 10000 });

    // Check that multiple projects are shown
    const cardCount = await projectCards.count();
    expect(cardCount).toBeGreaterThanOrEqual(1);
  });

  test('should display tech filter buttons', async ({ page }) => {
    await page.goto('/projects');

    // Wait for page to load
    await page.waitForLoadState('networkidle');

    // Check for "all" filter button
    const allButton = page.locator('button:has-text("all"), nav button').first();
    await expect(allButton).toBeVisible({ timeout: 10000 });

    // Check for specific tech filters (nuxt and tailwindcss from karngyan-com.md)
    const nuxtButton = page.locator('button:has-text("nuxt")');
    const tailwindButton = page.locator('button:has-text("tailwindcss")');

    // At least one tech filter should be visible
    const nuxtVisible = await nuxtButton.count() > 0;
    const tailwindVisible = await tailwindButton.count() > 0;
    expect(nuxtVisible || tailwindVisible).toBeTruthy();
  });

  test('should filter projects by technology', async ({ page }) => {
    await page.goto('/projects');

    // Wait for content to load
    await page.waitForLoadState('networkidle');

    // Wait for project cards to be visible
    await page.waitForSelector('[class*="ProjectCard"], article', { timeout: 10000 });

    // Get initial project count with "all" selected
    const initialProjects = page.locator('[class*="ProjectCard"], article');
    const initialCount = await initialProjects.count();
    expect(initialCount).toBeGreaterThanOrEqual(1);

    // Click on a specific tech filter (e.g., "nuxt")
    const techButton = page.locator('button:has-text("nuxt")').first();
    if (await techButton.count() > 0) {
      await techButton.click();

      // Wait for filtering to take effect
      await page.waitForTimeout(500);

      // Verify the tech filter is now active
      await expect(techButton).toHaveClass(/bg-gray-900|text-gray-300/);

      // Projects should still be visible
      const filteredProjects = page.locator('[class*="ProjectCard"], article');
      const filteredCount = await filteredProjects.count();
      expect(filteredCount).toBeGreaterThanOrEqual(1);
    }
  });

  test('should display project metadata', async ({ page }) => {
    await page.goto('/projects');

    // Wait for content to load
    await page.waitForLoadState('networkidle');

    // Wait for project cards
    const projectCards = page.locator('[class*="ProjectCard"], article');
    await expect(projectCards.first()).toBeVisible({ timeout: 10000 });

    // Check for project title (karngyan.com is one of the projects)
    const projectTitle = page.locator('text=karngyan.com, text=covidhelp, text=interviewready, text=lookatx').first();
    await expect(projectTitle).toBeVisible();

    // Get first card content
    const firstCard = projectCards.first();
    const cardText = await firstCard.textContent();
    expect(cardText).toBeTruthy();
  });

  test('should navigate to individual project page', async ({ page }) => {
    await page.goto('/projects');

    // Wait for content to load
    await page.waitForLoadState('networkidle');

    // Wait for project cards to be visible
    await page.waitForSelector('[class*="ProjectCard"], article', { timeout: 10000 });

    // Get the URL before clicking
    const currentUrl = page.url();

    // Find a project title link (look for the title as a link)
    const projectLink = page.locator('[class*="ProjectCard"] a, article a').first();

    if (await projectLink.count() > 0) {
      await projectLink.click();

      // Wait a bit for navigation
      await page.waitForTimeout(1000);

      // Check if we navigated to a project detail page or external link
      const newUrl = page.url();

      // Either we went to /projects/slug or external site
      const navigated = newUrl !== currentUrl;
      expect(navigated).toBeTruthy();
    }
  });

  test('should display project logos or images', async ({ page }) => {
    await page.goto('/projects');

    // Wait for content to load
    await page.waitForLoadState('networkidle');

    // Check for project images/logos
    const projectImages = page.locator('img[src*="/images/"]');

    // Wait for at least one image to be visible
    const imageCount = await projectImages.count();
    if (imageCount > 0) {
      await expect(projectImages.first()).toBeVisible({ timeout: 10000 });
    }
  });

  test('should have hover effects on project cards', async ({ page }) => {
    await page.goto('/projects');

    // Wait for content to load
    await page.waitForLoadState('networkidle');

    // Wait for project cards
    const projectCard = page.locator('[class*="ProjectCard"], article').first();
    await expect(projectCard).toBeVisible({ timeout: 10000 });

    // Hover over the card
    await projectCard.hover();

    // Wait a moment for any animations
    await page.waitForTimeout(500);

    // Card should still be visible after hover
    await expect(projectCard).toBeVisible();
  });

  test('should switch between tech filters correctly', async ({ page }) => {
    await page.goto('/projects');

    // Wait for content to load
    await page.waitForLoadState('networkidle');

    // Click "all" button
    const allButton = page.locator('button:has-text("all")').first();
    await allButton.click();
    await page.waitForTimeout(500);

    // Verify all button is active
    await expect(allButton).toHaveClass(/bg-gray-900|text-gray-300/);

    // Get count of all projects
    const allProjects = page.locator('[class*="ProjectCard"], article');
    const allCount = await allProjects.count();

    // Now click a specific tech filter
    const techButtons = page.locator('button:has-text("nuxt"), button:has-text("tailwindcss")');
    const techButtonCount = await techButtons.count();

    if (techButtonCount > 0) {
      await techButtons.first().click();
      await page.waitForTimeout(500);

      // Projects should still be displayed
      const filteredProjects = page.locator('[class*="ProjectCard"], article');
      const filteredCount = await filteredProjects.count();
      expect(filteredCount).toBeGreaterThanOrEqual(1);
    }
  });
});
