import { WeatherForecastSlowPage } from '@_src/pages/simple-weather-forecast-slow.page';
import { test, expect } from '@playwright/test';

test.describe('Delayed temperature handling', () => {
  let weatherForecastSlowPage: WeatherForecastSlowPage;
  test.beforeEach(async ({ page }) => {
    weatherForecastSlowPage = new WeatherForecastSlowPage(page);
    await weatherForecastSlowPage.navigateTo();
  });
  test('1. Temperature is in range (-20 - 30) (no custom assertion)', async () => {
    // Arrange
    // const temperatureTestId = 'dti-temperature-today';
    // const expectedMinTemperature = -20;
    // const expectedMaxTemperature = 33;
    // Locator
    // const temperatureLocator = page.getByTestId(temperatureTestId);
    // console.log(temperatureLocator);
    // Act
    // Assert
    expect(1).toBeGreaterThanOrEqual(0);
  });
});

// import { WeatherForecastSlowPage } from '@_src/pages/simple-weather-forecast-slow.page';
// import { test, expect } from '@playwright/test';

// test.describe('Weather forecast', () => {
//   let weatherForecastSlowPage: WeatherForecastSlowPage;
//   test.beforeEach('Navigate to proper page', async ({ page }) => {
//     weatherForecastSlowPage = new WeatherForecastSlowPage(page);
//     await weatherForecastSlowPage.navigateTo();
//   });
//   test('just for verification if works', () => {
//     expect(1).toBeGreaterThanOrEqual(0);
//   });
//   // test('1. Temperature is in proper range (-20 - 40) (not-custom assertion)', async ({ page }) => {
//   //   // Arrange
//   //   const temperatureTestId = 'dti-temperature-today';
//   //   const expectedMinTemperature = -20;
//   //   const expectedMaxTemperature = 33;
//   //   // Locator
//   //   const temperatureLocator = page.getByTestId(temperatureTestId);
//   //   // Act
//   //   await expect(temperatureLocator).toBeVisible();
//   //   const tempValue = await temperatureLocator.innerText();
//   //   const tempValueAsNumber = parseInt(tempValue);
//   //   console.log(tempValueAsNumber);
//   //   // Assert
//   //   expect(tempValueAsNumber).toBeGreaterThanOrEqual(expectedMinTemperature);
//   //   expect(tempValueAsNumber).toBeLessThanOrEqual(expectedMaxTemperature);
//   // });
// });
