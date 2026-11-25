import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  timeout: 180000,
  use: {
    headless: false,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    viewport:{width: 1265, height: 585},
  },
  reporter: 'html',
  
})