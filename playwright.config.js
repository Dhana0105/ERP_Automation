import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  expect: {
    timeout: 10000,
  },

  workers: 1,

  reporter: [
    ['list'],
    ['html', { open: 'never' }],
  ],

  use: {
    
    actionTimeout: 15000,
    navigationTimeout: 30000,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        headless: false,
          viewport: {
      width: 1265,
      height: 585,
    },
      },
    },
  ],
});
