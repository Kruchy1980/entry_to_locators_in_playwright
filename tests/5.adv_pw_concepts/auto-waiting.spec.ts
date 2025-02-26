import { NotDisplayedElementsPage } from '@_src/pages/not-displayed-elements.page';
import { test, expect } from '@playwright/test';

test.describe('Auto waiting in PW', () => {
  let notDisplayedElementsPage: NotDisplayedElementsPage;
  test.beforeEach('Navigate to proper page', async ({ page }) => {
    notDisplayedElementsPage = new NotDisplayedElementsPage(page);
    notDisplayedElementsPage.navigateTo();
  });
  test('1. Click on timely disabled button', async ({ page }) => {
    //Arrange
    const buttonTestId = 'dti-button-element';
    const resultsTestId = 'dti-results';
    const expectedMessage = 'You clicked the button!';
    // Locators
    const buttonLocator = page.getByTestId(buttonTestId);
    const resultsLocator = page.getByTestId(resultsTestId);
    //Act
    await buttonLocator.click();
    //Assert
    await expect(resultsLocator).toHaveText(expectedMessage);
  });
});
