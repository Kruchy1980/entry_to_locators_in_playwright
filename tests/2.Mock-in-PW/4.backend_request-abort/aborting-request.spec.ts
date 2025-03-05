/*
That function is helpful when we want:
1. to cut or restrict communication from other servers to ours
2. save the transfer
3. testing non common scenario:
    - Opening links in new tab without page loading
*/

import { CityWeatherPage } from '@_src/pages/for_mocks/city-weather.page';
import { test, expect } from '@playwright/test';

test.describe('City weather handling', () => {
  let cityWeatherPage: CityWeatherPage;
  test.beforeEach(async ({ page }) => {
    cityWeatherPage = new CityWeatherPage(page);
    // await cityWeatherPage.navigateTo(); //--> Here can be used because response is received after button click used
  });
  test('1. Abort get city weather request', async ({ page }) => {
    // Arrange
    const getWeatherButtonTestId = 'get-weather';
    const weatherTableTestId = 'results-table';

    // Locators
    const getWeatherButtonLocator = page.getByTestId(getWeatherButtonTestId);
    const resultsTableLocator = page.getByTestId(weatherTableTestId);
    // Act
    await page.route('/api/v1/data/random/weather-simple', async (route) => {
      // Abort request method
      route.abort();
    });
    await cityWeatherPage.navigateTo();

    await getWeatherButtonLocator.click();
    // Assert
    // expect(1).toBeGreaterThanOrEqual(0);
    await expect(resultsTableLocator).toBeHidden();
  });
  test('2. Abort all request for images from backend to frontend', async ({ page }) => {
    // Arrange
    const getWeatherButtonTestId = 'get-weather';
    const weatherTableTestId = 'results-table';

    // Locators
    const getWeatherButtonLocator = page.getByTestId(getWeatherButtonTestId);
    const resultsTableLocator = page.getByTestId(weatherTableTestId);
    // Act - using regExp possible
    await page.route(/(\.png)/, async (route) => {
      // Abort request for images
      route.abort();
    });
    await cityWeatherPage.navigateTo();

    await getWeatherButtonLocator.click();
    // Assert
    // expect(1).toBeGreaterThanOrEqual(0);
    await expect(resultsTableLocator).toBeVisible();
  });
  test('2. Abort all request for styles from backend to frontend', async ({ page }) => {
    // Arrange
    const getWeatherButtonTestId = 'get-weather';
    const weatherTableTestId = 'results-table';

    // Locators
    const getWeatherButtonLocator = page.getByTestId(getWeatherButtonTestId);
    const resultsTableLocator = page.getByTestId(weatherTableTestId);
    // Act - using regExp possible
    await page.route(/(\.css)/, async (route) => {
      // Abort request for images
      route.abort();
    });
    await cityWeatherPage.navigateTo();

    await getWeatherButtonLocator.click();
    // Assert
    // expect(1).toBeGreaterThanOrEqual(0);
    await expect(resultsTableLocator).toBeVisible();
  });
});
