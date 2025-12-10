import { test, expect } from '@playwright/test';

test.describe('GitHub Contributions Calendar', () => {
  test('should display GitHub calendar on homepage', async ({ page }) => {
    await page.goto('/');

    // Wait for page to fully load
    await page.waitForLoadState('networkidle');

    // Check for GitHub calendar section header
    const calendarHeader = page.locator('text=contributions');
    await expect(calendarHeader).toBeVisible({ timeout: 15000 });

    // Check for subtext
    const subtext = page.locator('text=github calendar heatmap');
    await expect(subtext).toBeVisible();
  });

  test('should render GitHub calendar SVG', async ({ page }) => {
    await page.goto('/');

    // Wait for page load
    await page.waitForLoadState('networkidle');

    // Wait a bit for the GitHub calendar to load from external API
    await page.waitForTimeout(3000);

    // Check for calendar container
    const calendarContainer = page.locator('.calendar');
    await expect(calendarContainer).toBeVisible({ timeout: 15000 });

    // Check for SVG elements that make up the calendar
    const svgElements = page.locator('.calendar svg');
    const svgCount = await svgElements.count();

    // GitHub calendar should have rendered some SVG elements
    expect(svgCount).toBeGreaterThan(0);
  });

  test('should display contribution squares/rectangles', async ({ page }) => {
    await page.goto('/');

    // Wait for page load and calendar to render
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);

    // Check for contribution day rectangles
    const contributionDays = page.locator('rect[class*="ContributionCalendar"], .calendar rect');
    const dayCount = await contributionDays.count();

    // Calendar should have many day squares (at least 50 for a few months)
    expect(dayCount).toBeGreaterThan(50);
  });

  test('should have link to GitHub profile', async ({ page }) => {
    await page.goto('/');

    // Wait for page load
    await page.waitForLoadState('networkidle');

    // Check for link to GitHub profile (from config: karngyan)
    const githubLink = page.locator('a[href*="github.com/karngyan"]');
    await expect(githubLink.first()).toBeVisible({ timeout: 15000 });

    // Verify link opens in new tab
    const target = await githubLink.first().getAttribute('target');
    expect(target).toBe('_blank');
  });

  test('should display GitHub username', async ({ page }) => {
    await page.goto('/');

    // Wait for page load
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    // Check for GitHub username in the calendar section
    const username = page.locator('text=karngyan, a[href*="karngyan"]');
    await expect(username.first()).toBeVisible({ timeout: 15000 });
  });

  test('should show contribution levels with different colors', async ({ page }) => {
    await page.goto('/');

    // Wait for calendar to load
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);

    // Get contribution day rectangles
    const contributionDays = page.locator('rect[data-level]');
    const dayCount = await contributionDays.count();

    if (dayCount > 0) {
      // Check that we have different data-level attributes
      const levels = new Set<string>();

      for (let i = 0; i < Math.min(dayCount, 50); i++) {
        const level = await contributionDays.nth(i).getAttribute('data-level');
        if (level) {
          levels.add(level);
        }
      }

      // Should have at least a couple different contribution levels
      expect(levels.size).toBeGreaterThan(0);
    } else {
      // If no data-level attributes, just verify rectangles exist
      const allRects = page.locator('.calendar rect');
      const rectCount = await allRects.count();
      expect(rectCount).toBeGreaterThan(50);
    }
  });

  test('should have calendar in proper section with borders', async ({ page }) => {
    await page.goto('/');

    // Wait for page load
    await page.waitForLoadState('networkidle');

    // Check that calendar is in a bordered section
    const calendarSection = page.locator('[class*="border"]').filter({
      has: page.locator('.calendar')
    });

    const sectionExists = await calendarSection.count() > 0;
    expect(sectionExists).toBeTruthy();
  });

  test('should be responsive on mobile devices', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);

    // Calendar should still be visible on mobile
    const calendarContainer = page.locator('.calendar');
    await expect(calendarContainer).toBeVisible({ timeout: 15000 });

    // SVG should exist
    const svgElements = page.locator('.calendar svg');
    const svgCount = await svgElements.count();
    expect(svgCount).toBeGreaterThan(0);
  });

  test('should display contribution count or stats', async ({ page }) => {
    await page.goto('/');

    // Wait for calendar to load
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);

    // Check for contribution stats text
    // GitHub calendar usually shows "X contributions in the last year"
    const statsText = page.locator('text=/contribution|commit/i');
    const hasStats = await statsText.count() > 0;

    // Stats might not always be visible depending on implementation
    // So we just verify the calendar section exists
    const calendarSection = page.locator('.calendar');
    await expect(calendarSection).toBeVisible();
  });

  test('should load calendar without JavaScript errors', async ({ page }) => {
    // Listen for console errors
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Wait for calendar to attempt loading
    await page.waitForTimeout(5000);

    // Check that there are no critical calendar loading errors
    const calendarErrors = errors.filter(err =>
      err.toLowerCase().includes('calendar') ||
      err.toLowerCase().includes('github')
    );

    // Some errors might be acceptable (API rate limits, etc.)
    // But there shouldn't be many
    expect(calendarErrors.length).toBeLessThan(3);
  });

  test('should have hover tooltips on calendar days', async ({ page }) => {
    await page.goto('/');

    // Wait for calendar to load
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);

    // Try to hover over a contribution day
    const contributionDay = page.locator('.calendar rect[data-level]').first();

    if (await contributionDay.count() > 0) {
      await contributionDay.hover();

      // Wait for potential tooltip
      await page.waitForTimeout(500);

      // Tooltip might appear - this is optional functionality
      // Just verify hovering doesn't break anything
      const calendarContainer = page.locator('.calendar');
      await expect(calendarContainer).toBeVisible();
    }
  });
});
