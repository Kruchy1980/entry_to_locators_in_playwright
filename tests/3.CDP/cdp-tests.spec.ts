/*
CDP (Chrome DevTools protocol) and communication with browser during tests
Allows us to:
- remote communication with chromium based browsers
- monitoring and handling of browser
- automatization, debugging and profiling 
CDP works based on WebSockets - details under URL: 
https://www.diffusiondata.com/what-are-web-sockets-and-how-do-they-work/#:~:text=WebSockets%20are%20a%20protocol%20for,between%20the%20client%20and%20server.
Can be used for:
- Simulation of poor internet connection
- mobile view
- collecting performance metrics from browser
- changing language and settings of region
*/

import { CityWeatherPage } from '@_src/pages/for_mocks/city-weather.page';
import { test, expect } from '@playwright/test';

test.describe('CDP communication handling', () => {
  let cityWeatherPage: CityWeatherPage;
  test.beforeAll(async ({ page }) => {
    cityWeatherPage = new CityWeatherPage(page);
    // await cityWeatherPage.navigateTo();
  });
  test('1. CDP communication tests', async ({ context, page }) => {
    // Arrange
    const tableTestId = 'results-table';
    const getWeatherButtonTestId = 'get-weather';
    // Locators
    const tableLocator = page.getByTestId(tableTestId);
    const getWeatherButtonLocator = page.getByTestId(getWeatherButtonTestId);
    // Act
    // Create cdp session !!! browser context must be used here - the method .newCDPSession() <-- prepares sessionObject which
    // Allows us communication with page which takes parameters dependent of our needs
    const cdpSession = await context.newCDPSession(page);
    // Prepare session for simulating poor network connection 1 param - name of simulation,
    // 2nd object with params contains net condition
    // Official documentation is under that URL: https://github.com/ChromeDevTools/devtools-frontend/blob/main/front_end/core/sdk/NetworkManager.ts
    await cdpSession.send('Network.emulateNetworkConditions', {
      // Slow 3G
      downloadThroughput: ((500 * 1000) / 8) * 0.8,
      offline: false,
      latency: 200 * 5,
      uploadThroughput: ((500 * 1000) / 8) * 0.8,
    });

    await cityWeatherPage.navigateTo();
    await page.waitForLoadState('domcontentloaded');

    await getWeatherButtonLocator.click();
    // Assert
    await expect(tableLocator).toBeVisible();
  });
  test('1.2. CDP communication tests - enable No Throttling', async ({ context, page }) => {
    // !!! If we keep all tests in one file we need to remember that settings in one context of page are stored for all tests so we need to modify them of
    // going back to proper settings in each test or in the formerly written down test
    // Other solution is to kill the context of browser after each test
    // Arrange
    const tableTestId = 'results-table';
    const getWeatherButtonTestId = 'get-weather';
    // Locators
    const tableLocator = page.getByTestId(tableTestId);
    const getWeatherButtonLocator = page.getByTestId(getWeatherButtonTestId);
    // Act
    // Create cdp session !!! browser context must be used here - the method .newCDPSession() <-- prepares sessionObject which
    // Allows us communication with page which takes parameters dependent of our needs
    const cdpSession = await context.newCDPSession(page);
    // Prepare session for simulating poor network connection  with noThrottling, <-- see object prepared below all of the tests
    await cdpSession.send('Network.emulateNetworkConditions', NETWORK_PRESETS.noThrottle);

    await cityWeatherPage.navigateTo();
    await page.waitForLoadState('domcontentloaded');

    await getWeatherButtonLocator.click();
    // Assert
    await expect(tableLocator).toBeVisible({ timeout: 10_000 });
  });
  test('2. Scripts execution disabled', async ({ context, page }) => {
    // Arrange
    const tableTestId = 'results-table';
    const getWeatherButtonTestId = 'get-weather';
    // Locators
    const tableLocator = page.getByTestId(tableTestId);
    const getWeatherButtonLocator = page.getByTestId(getWeatherButtonTestId);
    // Act
    // Create cdp session !!! browser context must be used here - the method .newCDPSession() <-- prepares sessionObject which
    const cdpSession = await context.newCDPSession(page);
    // Prepare session with disabled scripts execution
    await cdpSession.send('Emulation.setScriptExecutionDisabled', { value: true });

    await cityWeatherPage.navigateTo();
    await page.waitForLoadState('domcontentloaded');

    await getWeatherButtonLocator.click();
    // Assert we expect that table won't be visible here
    await expect(tableLocator).toBeHidden();
  });
  test('3. Mobile view test - Slow 3G', async ({ context, page }) => {
    // Arrange
    const tableTestId = 'results-table';
    const getWeatherButtonTestId = 'get-weather';
    // Locators
    const tableLocator = page.getByTestId(tableTestId);
    const getWeatherButtonLocator = page.getByTestId(getWeatherButtonTestId);
    // Act
    // Create cdp session !!! browser context must be used here - the method .newCDPSession() <-- prepares sessionObject which
    const cdpSession = await context.newCDPSession(page);
    // Prepare session with disabled scripts execution
    await cdpSession.send('Emulation.setDeviceMetricsOverride', {
      deviceScaleFactor: 1,
      mobile: true,
      height: 800,
      width: 400,
    });
    await cityWeatherPage.navigateTo();
    await page.waitForLoadState('domcontentloaded');

    await getWeatherButtonLocator.click();
    // Assert we expect that table won't be visible here
    await expect(tableLocator).toBeVisible();
  });
  test('4. Performance metrics', async ({ context, page }) => {
    // Arrange
    const tableTestId = 'results-table';
    const getWeatherButtonTestId = 'get-weather';
    // Locators
    const tableLocator = page.getByTestId(tableTestId);
    const getWeatherButtonLocator = page.getByTestId(getWeatherButtonTestId);
    // Act
    // Create cdp session !!! browser context must be used here - the method .newCDPSession() <-- prepares sessionObject which
    const cdpSession = await context.newCDPSession(page);
    // 1. Prepare session with performance enabled
    await cdpSession.send('Performance.enable');

    await cityWeatherPage.navigateTo();
    await page.waitForLoadState('domcontentloaded');

    await getWeatherButtonLocator.click();
    // Assert we expect that table won't be visible here
    await expect(tableLocator).toBeVisible();

    // 2. To get metrics we need to recall cdpSession after performed test
    const metrics = await cdpSession.send('Performance.getMetrics');
    // eslint-disable-next-line no-console
    console.log(metrics);
  });
  // Killing browser after each test
  test.afterEach('Kill browser', async ({ page }) => {
    await page.close();
  });
});

// Prepare object which will pass proper network emulation as in test "1.2. CDP communication tests - enable No Throttling"
export const NETWORK_PRESETS = {
  offline: {
    offline: true,
    downloadThroughput: 0,
    uploadThroughput: 0,
    latency: 0,
  },
  noThrottle: {
    offline: false,
    downloadThroughput: -1,
    uploadThroughput: -1,
    latency: 0,
  },
  slow3GConditions: {
    // All settings can be freely modified
    offline: false,
    downloadThroughput: ((500 * 1000) / 8) * 0.8,
    uploadThroughput: ((500 * 1000) / 8) * 0.8,
    latency: 800 * 5,
  },
  fast3GConditions: {
    offline: false,
    downloadThroughput: ((1.6 * 1000 * 1000) / 8) * 0.9,
    uploadThroughput: ((750 * 1000) / 8) * 0.9,
    latency: 150 * 3.75,
  },
};
