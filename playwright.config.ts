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
// The former attitude with 2 different setup and spec files
// Not recommended
// export const SESSION_PATH = path.join(__dirname, './.auth/session.json'); // To keep the file in separate folder of our project
// // RECOMMENDED - name must be updated to proper one
// export const SESSION_PATH_SETUP = path.join(__dirname, './.auth/session-setup.json'); // To keep the file in separate folder of our project
// Present attitude - multi sessions in one file
export const CREATOR_SESSION_PATH = path.join(__dirname, './src/.auth/creator.json');
export const VIEWER_SESSION_PATH = path.join(__dirname, './src/.auth/viewer.json');
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
  // workers: process.env.CI ? 1 : undefined,
  workers: undefined,
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
    // Projects for attitude with one file for many sessions used in Test Sets directly
    // 1. Setup launcher
    // {
    //   name: 'setup',
    //   use: { ...devices['Desktop Chrome'] },
    //   testMatch: /.*\.setup\.ts/,
    // },
    // // 2. Dependent project
    // {
    //   name: 'chromium-pre-sessions',
    //   use: {
    //     ...devices['Desktop Chrome'],
    //     // storageState: CREATOR_SESSION_PATH, // Not inject from config JSON
    //   },
    //   dependencies: ['setup'],
    // },
    // Projects for attitude with one file for many sessions used in the projects directly
    // 1. Setup launcher
    {
      name: 'setup',
      use: { ...devices['Desktop Chrome'] },
      grep: /@creator/,
      testMatch: /.*\.setup\.ts/,
      // testMatch: 'multi-session.setup.ts',
    },
    // 2. Dependent project
    {
      name: 'creator-role',
      grep: /@creator/,
      use: {
        ...devices['Desktop Chrome'],
        storageState: CREATOR_SESSION_PATH,
      },
      dependencies: ['setup'],
    },
    // Separate session preparation for specific test
    {
      name: 'setup-viewer',
      use: { ...devices['Desktop Chrome'] },
      grep: /@viewer/,
      testMatch: /.*\.setup\.ts/,
    },
    {
      name: 'viewer-role',
      grep: /@viewer/,
      use: {
        ...devices['Desktop Chrome'],
        storageState: VIEWER_SESSION_PATH,
      },
      dependencies: ['setup'],
    },
    // Project for separate setup files or .spec.ts files
    // The project is used only for authorization.spec.ts used as the pre-configuration file - not recommended
    // {
    //   name: 'setupspec',
    //   use: { ...devices['Desktop Chrome'] },
    //   testMatch: '.*/authentication.spec.ts',
    // },
    // {
    //   name: 'chromium',
    //   use: { ...devices['Desktop Chrome'], storageState: SESSION_PATH },
    //   dependencies: ['setupspec'],
    // },
    // // Those 2 projects ars used with proper setup with setup test used globally for creation session
    // {
    //   name: 'chromium-session based tests',
    //   use: { ...devices['Desktop Chrome'], storageState: SESSION_PATH_SETUP },
    //   dependencies: ['setup'],
    // },
    // // The setup project must be added in here
    // {
    //   name: 'setup',
    //   testMatch: '**.setup.ts',
    // },
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
