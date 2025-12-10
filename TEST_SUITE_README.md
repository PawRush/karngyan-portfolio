# Playwright Test Suite for karngyan-portfolio

## Overview
This test suite provides comprehensive end-to-end testing for the Nuxt.js portfolio website using Playwright.

## Test Coverage

### 1. Homepage Tests (`tests/homepage.spec.ts`)
- Hero section with title and description
- Navigation menu visibility and links
- Recent blog posts section
- Recommendations section
- Blog link functionality
- Meta tags and SEO

### 2. Blog Listing Tests (`tests/blog.spec.ts`)
- Blog page header and subtext
- Blog post cards display
- Category filter buttons
- Category filtering functionality
- Navigation to individual posts
- Post metadata display

### 3. Individual Blog Post Tests (`tests/blog-post.spec.ts`)
- Blog post content rendering
- Author information display
- Post metadata (date, reading time, category)
- Tag display
- Markdown content with images and code blocks
- Breadcrumb navigation
- Twitter share functionality
- Scroll to top button
- Multiple blog post pages

### 4. Projects Page Tests (`tests/projects.spec.ts`)
- Projects page header and subtext
- Project cards display
- Technology filter buttons
- Technology filtering functionality
- Project metadata
- Navigation to project details
- Project logos/images
- Hover effects
- Filter switching

### 5. Resume Page Tests (`tests/resume.spec.ts`)
- Resume page header
- Download button functionality
- PDF viewer component
- PDF URL configuration
- Author name display
- Styling and layout
- Download icon
- Responsive design
- PDF loading without errors

### 6. GitHub Contributions Calendar Tests (`tests/github-calendar.spec.ts`)
- Calendar display on homepage
- GitHub calendar SVG rendering
- Contribution squares/rectangles
- Link to GitHub profile
- GitHub username display
- Contribution levels with different colors
- Section borders
- Mobile responsiveness
- Contribution stats
- Error-free loading
- Hover tooltips

## Running the Tests

### Prerequisites
```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install chromium
```

### Run Tests
```bash
# Run all tests
npm test

# Run tests in headed mode (see browser)
npm run test:headed

# Run tests in debug mode
npm run test:debug

# Run specific test file
npx playwright test tests/homepage.spec.ts

# Run tests with UI mode
npx playwright test --ui
```

### Test Configuration
The test configuration is defined in `playwright.config.ts`:
- **Test timeout**: 60 seconds per test
- **Workers**: 3 parallel workers (1 in CI)
- **Retries**: 1 retry on failure (2 in CI)
- **Base URL**: http://localhost:3000
- **Browser**: Chromium
- **Auto web server**: Starts Nuxt dev server automatically

## Important Notes

### Node.js Compatibility
This project uses Node.js v22 with the `--openssl-legacy-provider` flag due to webpack compatibility:
```bash
NODE_OPTIONS="--openssl-legacy-provider" npm run dev
```

The web server configuration in `playwright.config.ts` automatically applies this flag.

### Firebase Features
Some features (comments, likes) require Firebase configuration. The tests check for basic page functionality without requiring Firebase to be fully configured.

### External Dependencies
- **GitHub Calendar**: Tests may take longer due to external API calls to GitHub
- **PDF Viewer**: Resume tests include PDF loading which may take a few seconds

## Test Results
Tests generate:
- HTML report in `playwright-report/`
- Screenshots on failure in `test-results/`
- Trace files for debugging in `test-results/`

View the HTML report:
```bash
npx playwright show-report
```

## CI/CD Integration
The test suite is configured for CI/CD with:
- Reduced parallelization (1 worker)
- More retries (2 retries)
- Strict test enforcement (forbidOnly)

## Maintenance
Tests use flexible selectors and wait strategies to handle:
- Dynamic content loading
- Animation effects
- External API calls (GitHub calendar)
- PDF rendering delays

If tests fail:
1. Check if dev server is running properly
2. Verify Node.js version compatibility
3. Review test screenshots in `test-results/`
4. Run tests in headed mode for visual debugging
5. Check trace files for detailed execution logs
