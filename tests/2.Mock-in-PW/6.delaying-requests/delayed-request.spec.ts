/*
Usage of delaying:
1. Testing application workability slowing connection:
    - verify working scripts on FE
    - How slowed down data is presented to user
2. Verifying tests on slower application working
!!! Slowing down the page.route() refer only to API responses - not fully simulates slower App working
*/

import { CityWeatherPage } from '@_src/pages/for_mocks/city-weather.page';
import { test, expect } from '@playwright/test';

test.describe('City weather handling', () => {
  let cityWeatherPage: CityWeatherPage;
  test.beforeAll(async ({ page }) => {
    cityWeatherPage = new CityWeatherPage(page);
    // await cityWeatherPage.navigateTo(); //--> Here can be used because response is received after button click used
  });
  test('1. Delayed table should be visible', async ({ page }) => {
    // Arrange
    const getWeatherButtonTestId = 'get-weather';
    const resultsTableTestId = 'results-table';

    // Locators
    const getWeatherButtonLocator = page.getByTestId(getWeatherButtonTestId);
    const resultsTableLocator = page.getByTestId(resultsTableTestId);

    await cityWeatherPage.navigateTo();

    // Act
    // Slowing down only one request
    // await page.route('/api/v1/data/random/weather-simple', async (route) => {
    // Slowing down all responses for the request --> see URL
    await page.route('/api/**', async (route) => {
      // eslint-disable-next-line playwright/no-wait-for-timeout
      await page.waitForTimeout(2500); // by using the timeout we can slows down the responses only
      await route.continue();
      //   await route.f
      //   //   if (route.request().method() === 'POST') {
      //   //     await route.fallback(); // <-- mechanism similar to the route.continue but
      //   //   }
    });

    await getWeatherButtonLocator.click();
    // Assert
    expect(1).toBeGreaterThanOrEqual(0);
    await expect(resultsTableLocator).toBeVisible();
  });
});
