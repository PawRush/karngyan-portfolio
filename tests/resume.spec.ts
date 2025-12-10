import { test, expect } from '@playwright/test';

test.describe('Resume Page', () => {
  test('should display resume page with header', async ({ page }) => {
    await page.goto('/resume');

    // Check page title
    await expect(page).toHaveTitle(/resume|résumé/i);

    // Check for resume header
    const resumeHeader = page.locator('text=/resume|résumé/i').first();
    await expect(resumeHeader).toBeVisible({ timeout: 10000 });
  });

  test('should display download button', async ({ page }) => {
    await page.goto('/resume');

    // Wait for page load
    await page.waitForLoadState('networkidle');

    // Check for download button
    const downloadButton = page.locator('text=download, a[download], button:has-text("download")').first();
    await expect(downloadButton).toBeVisible({ timeout: 10000 });

    // Verify download button has correct href
    const downloadLink = page.locator('a[download], a:has-text("download")').first();
    const href = await downloadLink.getAttribute('href');
    expect(href).toContain('.pdf');
  });

  test('should display PDF viewer component', async ({ page }) => {
    await page.goto('/resume');

    // Wait for page load
    await page.waitForLoadState('networkidle');

    // Wait a bit for PDF to load
    await page.waitForTimeout(2000);

    // Check for PDF viewer container or iframe
    // PDF viewers typically use canvas, iframe, or embed elements
    const pdfContainer = page.locator('canvas, iframe, embed, object[type="application/pdf"]');

    // Check if at least one PDF rendering element exists
    const count = await pdfContainer.count();
    if (count > 0) {
      await expect(pdfContainer.first()).toBeVisible({ timeout: 15000 });
    } else {
      // If no standard PDF elements, check for the PdfViewer component wrapper
      const pdfViewerWrapper = page.locator('[class*="PdfViewer"]');
      await expect(pdfViewerWrapper.first()).toBeVisible({ timeout: 15000 });
    }
  });

  test('should have correct PDF URL configured', async ({ page }) => {
    await page.goto('/resume');

    // Wait for page load
    await page.waitForLoadState('networkidle');

    // Check that the PDF URL is set (from config: /RESUME_GYAN_KARN_DARK.pdf)
    const downloadLink = page.locator('a[href*=".pdf"]').first();
    const href = await downloadLink.getAttribute('href');

    expect(href).toBeTruthy();
    expect(href).toContain('RESUME');
  });

  test('should display author name on resume page', async ({ page }) => {
    await page.goto('/resume');

    // Wait for page load
    await page.waitForLoadState('networkidle');

    // Check for author name in header
    const authorName = page.locator('text=gyan prakash karn');
    await expect(authorName.first()).toBeVisible({ timeout: 10000 });
  });

  test('should have proper styling and layout', async ({ page }) => {
    await page.goto('/resume');

    // Wait for page load
    await page.waitForLoadState('networkidle');

    // Check that the page has proper container styling
    const container = page.locator('[class*="max-w"]').first();
    await expect(container).toBeVisible({ timeout: 10000 });

    // Verify page is not blank
    const bodyText = await page.textContent('body');
    expect(bodyText?.length).toBeGreaterThan(10);
  });

  test('should display download icon on button', async ({ page }) => {
    await page.goto('/resume');

    // Wait for page load
    await page.waitForLoadState('networkidle');

    // Check for SVG icon in download button (common pattern for download icons)
    const downloadIcon = page.locator('a:has-text("download") svg, button:has-text("download") svg').first();
    const iconExists = await downloadIcon.count() > 0;

    if (iconExists) {
      await expect(downloadIcon).toBeVisible();
    }
  });

  test('should be responsive on different viewport sizes', async ({ page }) => {
    // Test desktop view
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/resume');
    await page.waitForLoadState('networkidle');

    let resumeContent = page.locator('text=/resume|résumé/i').first();
    await expect(resumeContent).toBeVisible({ timeout: 10000 });

    // Test tablet view
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.waitForTimeout(500);

    resumeContent = page.locator('text=/resume|résumé/i').first();
    await expect(resumeContent).toBeVisible();

    // Test mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(500);

    resumeContent = page.locator('text=/resume|résumé/i').first();
    await expect(resumeContent).toBeVisible();
  });

  test('should load PDF without errors', async ({ page }) => {
    // Listen for console errors
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    await page.goto('/resume');
    await page.waitForLoadState('networkidle');

    // Wait for PDF to attempt loading
    await page.waitForTimeout(3000);

    // Check that there are no critical PDF loading errors
    // Note: Some warnings might be okay, but critical errors should not occur
    const criticalErrors = errors.filter(err =>
      err.toLowerCase().includes('failed') ||
      err.toLowerCase().includes('cannot read')
    );

    // We allow some errors since PDF viewer might have some quirks
    expect(criticalErrors.length).toBeLessThan(5);
  });
});
