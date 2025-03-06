/*
Usage of modification request cases:
1. send data which hard to set on FE:
    - simple security tests
    - API used by different applications
    - Early level functionality
*/

import { CityWeatherPage } from '@_src/pages/for_mocks/city-weather.page';
import { test, expect } from '@playwright/test';

test.describe('City weather handling', () => {
  let cityWeatherPage: CityWeatherPage;
  test.beforeAll(async ({ page }) => {
    cityWeatherPage = new CityWeatherPage(page);
    // await cityWeatherPage.navigateTo(); //--> Here can be used because response is received after button click used
  });
  test('1. Modify full request', async ({ page }) => {
    // Arrange
    const getWeatherButtonTestId = 'get-weather';
    // const resultsTableTestId = 'results-table';
    const commentCityTextTestId = 'comment';
    const expectedCityText = 'Helsinki';

    // Locators
    const getWeatherButtonLocator = page.getByTestId(getWeatherButtonTestId);
    // const resultsTableLocator = page.getByTestId(resultsTableTestId);
    const commentCityTextLocator = page.getByTestId(commentCityTextTestId);
    // Transfer to proper page
    await cityWeatherPage.navigateTo();
    // Act
    // Modify reqeust
    await page.route('/api/v1/data/random/weather-simple', async (route) => {
      await route.continue({ postData: { city: expectedCityText, futuredays: '3', days: 1 } });
      //   const response = await route.fetch();
      //   const responseJson = response.json();
      // Prepare proper mock object
    });

    // Send the request by clicking on specified element
    await getWeatherButtonLocator.click();
    // Assert
    expect(1).toBeGreaterThanOrEqual(0);
    await expect(commentCityTextLocator).toContainText(expectedCityText);
  });
  test('2. Modify city only - part of request data', async ({ page }) => {
    // Arrange
    const getWeatherButtonTestId = 'get-weather';
    // const resultsTableTestId = 'results-table';
    const commentCityTextTestId = 'comment';
    const expectedCityText = 'Helsinki';

    // Locators
    const getWeatherButtonLocator = page.getByTestId(getWeatherButtonTestId);
    // const resultsTableLocator = page.getByTestId(resultsTableTestId);
    const commentCityTextLocator = page.getByTestId(commentCityTextTestId);
    // Transfer to proper page
    await cityWeatherPage.navigateTo();
    // Act
    // Modify reqeust - another param must be added - request
    // Request contain data from the backend
    await page.route('/api/v1/data/random/weather-simple', async (route, request) => {
      // 1. Retrieve data from request sent to backend - request payload must be parsed to JSON
      // JSON.parse - returns us object which can be full object or null that is why we need to add condition in method
      const payloadBody = JSON.parse(request.postData() || '{}');
      // 2. assign to part of received object fiedld of City as we expect
      payloadBody.city = expectedCityText;
      await route.continue({ postData: payloadBody });
    });

    // Send the request by clicking on specified element
    await getWeatherButtonLocator.click();
    // Assert
    // expect(1).toBeGreaterThanOrEqual(0);
    await expect(commentCityTextLocator).toContainText(expectedCityText);
  });
});
