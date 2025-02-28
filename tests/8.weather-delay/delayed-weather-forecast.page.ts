import { WeatherForecastSlowPage } from '@_src/pages/simple-weather-forecast-slow.page';
import { test, expect } from '@playwright/test';

test.describe('Not Present Elements handling', () => {
  let weatherForecastSlowPage: WeatherForecastSlowPage;
  test.beforeEach('Navigate to proper page', async ({ page }) => {
    weatherForecastSlowPage = new WeatherForecastSlowPage(page);
    await weatherForecastSlowPage.navigateTo();
  });
  test('1. Input max length - simple test - no custom assert', async () => {
    // Arrange
    // Act
    // Assert
    expect(2).toBeGreaterThan(1);
  });
});
