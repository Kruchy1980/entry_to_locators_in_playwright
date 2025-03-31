import { getEnvURL } from '@_src/utils/environmentService';
import { defineConfig, devices } from '@playwright/test';
// For the session data use the import for path
import * as path from 'path';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });
// Now we can use data to be stored in STORAGE_STATE
// export const STORAGE_STATE = path.join(__dirname, 'tmp/sessionStorage.json');
// Add code for SESSION_PATH
// export const SESSION_PATH = path.join(__dirname, './src/.auth/session.json'); // <-- if we would like to keep it in src folder
export const SESSION_PATH = path.join(__dirname, './.auth/session.json'); // To keep the file in separate folder of our project

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* prepare path to global.setup.ts */
  // globalSetup: 'config/global.setup.ts',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://localhost:3000/',
    baseURL: getEnvURL(),
    // To locate element by other attributes we need to add entry in this section as below (not standardized attributes)
    // testIdAttribute: 'pw-test', // That entry defines which attribute will be searched using method .getByTestId() in PW

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // The project below do not need to be used at all
    {
      name: 'chromium-session based tests',
      use: { ...devices['Desktop Chrome'] },
      dependencies: ['setup'],
    },
    // The setup project must be added in here
    {
      name: 'setup',
      testMatch: '**.setup.ts',
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
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
