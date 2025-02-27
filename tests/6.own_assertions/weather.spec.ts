import { CustomAssertionsPage } from '@_src/pages/custom-assertion.page';
import { test, expect } from '@playwright/test';
import { expect as beingInRange } from '@_src/helpers/weather-temperature.expect';

test.describe('Weather forecast', () => {
  let customAssertionsPage: CustomAssertionsPage;
  test.beforeEach('Navigate to proper page', async ({ page }) => {
    customAssertionsPage = new CustomAssertionsPage(page);
    customAssertionsPage.navigateTo();
  });
  test('1. Temperature in range - without custom assertion', async ({ page }) => {
    // Arrange
    const todaysTemperatureTestId = 'dti-temperature-today';
    const minExpectedTemp = -30;
    const maxExpectedTemp = 50;

    // Locators
    const todaysTemperatureLocator = page.getByTestId(todaysTemperatureTestId);
    // Act
    await expect(todaysTemperatureLocator).toBeVisible();
    const tempValue = await todaysTemperatureLocator.innerText();
    const tempValueAsNumber = Number(tempValue);
    // Assert
    expect(tempValueAsNumber).toBeGreaterThanOrEqual(minExpectedTemp);
    expect(tempValueAsNumber).toBeLessThanOrEqual(maxExpectedTemp);
  });
  test('2. Temperature in range - with custom assertion usage', async ({ page }) => {
    // Arrange
    const todaysTemperatureTestId = 'dti-temperature-today';
    const minExpectedTemp = -30;
    const maxExpectedTemp = 50;
    // Locators
    const todaysTemperatureLocator = page.getByTestId(todaysTemperatureTestId);
    // Act
    await expect(todaysTemperatureLocator).toBeVisible();
    const tempValue = await todaysTemperatureLocator.innerText();
    // Assert
    beingInRange(tempValue).toBeInRange(minExpectedTemp, maxExpectedTemp);
  });
});
