import { defineConfig, devices } from '@playwright/test'

export const setupDir = './playwright/.setup'
export const setupFile = `${setupDir}/user.json`

export default defineConfig({
  reporter: [['html', { open: 'never' }]],
  use: {
    baseURL: 'http://localhost:8080',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      testMatch: '*.test.ts',
      testDir: './tests/',
      use: {
        ...devices['Desktop Chrome'],
        // Use "database" with existing accounts
        storageState: setupFile,
      }, 
    },
  ],
})
