import { DelayedElementsPage } from '@_src/pages/delayed_elements_results.page';
import { test, expect } from '@playwright/test';

test.describe('Auto waiting in PW - tasks', () => {
  let delayedElementsPage: DelayedElementsPage;
  test.beforeEach('Navigate to proper page', async ({ page }) => {
    delayedElementsPage = new DelayedElementsPage(page);
    delayedElementsPage.navigateTo();
  });
  test('1. Auto wait for button click and result display', async ({ page }) => {
    //Arrange
    const buttonTestId = 'dti-button-element-1';
    const resultTestId = 'dti-results';
    const expectedMessage = 'You clicked the button!';
    // Locators
    const buttonLocator = page.getByTestId(buttonTestId);
    const resultLocator = page.getByTestId(resultTestId);
    //Act
    await buttonLocator.click();
    //Assert
    await expect(resultLocator).toHaveText(expectedMessage);
  });
  test('2. WFA for button click and result display', async ({ page }) => {
    //Arrange
    const buttonTestId = 'dti-button-element-1';
    const resultTestId = 'dti-results';
    const expectedMessage = 'You clicked the button!';
    // Locators
    const buttonLocator = page.getByTestId(buttonTestId);
    const resultLocator = page.getByTestId(resultTestId);
    const buttonVisibility = buttonLocator.isVisible();
    const resultsVisibility = resultLocator;

    expect(buttonVisibility).toBeTruthy();
    //Act
    await buttonLocator.click();
    // expect(resultsVisibility).toBe(true); // will fail the test
    expect(resultsVisibility).toBeTruthy();
    //Assert
    await expect(resultLocator).toHaveText(expectedMessage);
  });
});
