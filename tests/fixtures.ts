import { test as base } from '@playwright/test';

// Extend the base test configuration
export const test = base.extend({
  // Override the default page fixture
  page: async ({ page }, use) => {
    // 1. Intercept network requests matching known ad networks
    await page.route('**/*google*/**', route => route.abort());
    await page.route('**/*googlesyndication*/**', route => route.abort());
    await page.route('**/*doubleclick*/**', route => route.abort());

    // 2. Hand over the modified page to the actual test
    await use(page);
  },
});

// Re-export expect so you can import both from this single file
export { expect } from '@playwright/test';
