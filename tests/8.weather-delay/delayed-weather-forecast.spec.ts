import { WeatherForecastSlowPage } from '@_src/pages/simple-weather-forecast-slow.page';
import { test, expect } from '@playwright/test';
import { expect as temperatureInRange } from '@_src/helpers/temperature-inRange.expect';

test.describe('Weather forecast', () => {
  let weatherForecastSlowPage: WeatherForecastSlowPage;
  test.beforeEach('Navigate to proper page', async ({ page }) => {
    weatherForecastSlowPage = new WeatherForecastSlowPage(page);
    await weatherForecastSlowPage.navigateTo();
  });
  test('just for verification if works', () => {
    expect(1).toBeGreaterThanOrEqual(0);
  });
  test('1. Temperature is in proper range (-20 - 33) (not-custom assertion)', async ({ page }) => {
    // Arrange
    const temperatureTestId = 'dti-temperature-today';
    const expectedMinTemperature = -20;
    const expectedMaxTemperature = 33;
    // Locator
    const temperatureLocator = page.getByTestId(temperatureTestId);
    // Act
    await expect(temperatureLocator).toBeVisible();
    const tempValue = await temperatureLocator.innerText();
    const tempValueAsNumber = parseInt(tempValue);
    // Assert
    expect(tempValueAsNumber).toBeGreaterThanOrEqual(expectedMinTemperature);
    expect(tempValueAsNumber).toBeLessThanOrEqual(expectedMaxTemperature);
  });
  test('2. Temperature is in proper range (-20 - 33) (custom web first assertion (WFA))', async ({
    page,
  }) => {
    // Arrange
    const temperatureTestId = 'dti-temperature-today';
    const expectedMinTemperature = -20;
    const expectedMaxTemperature = 33;
    // Locator
    const temperatureLocator = page.getByTestId(temperatureTestId);
    // Act
    // Assert
    await temperatureInRange(temperatureLocator).temperatureToBeInRange(
      expectedMinTemperature,
      expectedMaxTemperature,
    );
  });
});
