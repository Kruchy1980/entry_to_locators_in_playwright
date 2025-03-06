import { expect } from '@_src/helpers/humidity.expect';
import { WeatherForecastPage } from '@_src/pages/out_of_mock/simple-weather-forecast.page';
import { test } from '@playwright/test';

test.describe('Humidity Verification', () => {
  let weatherForecastPage: WeatherForecastPage;
  test.beforeEach('Navigate to proper page', async ({ page }) => {
    weatherForecastPage = new WeatherForecastPage(page);
    weatherForecastPage.navigateTo();
  });
  test('1. Humidity Verification - separate assertion for display and value fixed range', async ({
    page,
  }) => {
    // Arrange
    const todaysHumidityTestId = 'dti-humidity-today';
    // Act
    // const todaysHumidityLocator = page.getByTestId(todaysHumidityTestId);
    const todaysHumidityLocator = page.getByTestId(todaysHumidityTestId);
    const displayedHumidityText = await todaysHumidityLocator.innerText();
    // console.log(await todaysHumidityLocator.textContent()); // Returning node.text there is no assertion visible than - do not use
    // console.log(await todaysHumidityLocator.innerText());

    // console.log(await todaysHumidityLocator.textContent());
    // Assert
    expect(displayedHumidityText).toContainPercentageSign();
    expect(displayedHumidityText).toBeInProperRange();
  });
  test('2. Humidity Verification - with dynamic range', async ({ page }) => {
    // Arrange
    const todaysHumidityTestId = 'dti-humidity-today';
    const minExpectedHumidity = 22;
    const maxExpectedHumidity = 99;
    // Act
    // const todaysHumidityLocator = page.getByTestId(todaysHumidityTestId);
    const todaysHumidityLocator = page.getByTestId(todaysHumidityTestId);
    const displayedHumidity = await todaysHumidityLocator.innerText();

    // console.log(await todaysHumidityLocator.textContent());
    // Assert
    expect(displayedHumidity).toBeCorrectlyDisplayedAndInSpecificRange(
      minExpectedHumidity,
      maxExpectedHumidity,
    );
  });
});
