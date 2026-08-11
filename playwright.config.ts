import test, { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  /**
   * reporter: [
    ['html', {
      title: 'Shopping App - Automation Test Report',
      outputFolder: 'playwright-report',
      open: 'on-failure',           // 'always' | 'never' | 'on-failure'
      host: 'localhost',
      port: 9323,
      noCopyPrompt: false,
      noSnippets: false,
      doNotInlineAssets: false,
      mergeFiles: false,
    }],
  ]
   * 
   */
  reporter: [['allure-playwright', { outputFolder: 'allure-results' }]],
  timeout: 30000,
  // workers: 3, // Run tests sequentially to manage dependencies between registration and login tests
  retries: 2, // Retry failed tests up to 2 times
  expect:
    {
      timeout:8000,
    },
  use: {
    headless: true,
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: 'https://automationexercise.com',
    
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on',
    screenshot: 'only-on-failure',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
    //dependency management to ensure login tests run after registration tests
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
