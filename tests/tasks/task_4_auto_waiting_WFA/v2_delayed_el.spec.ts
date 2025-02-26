import { DelayedElementsV2Page } from '@_src/pages/delayed_v2.page';
import { test, expect } from '@playwright/test';

test.describe('Auto waiting in PW - tasks', () => {
  let delayedElementsV2Page: DelayedElementsV2Page;
  test.beforeEach('Navigate to proper page', async ({ page }) => {
    delayedElementsV2Page = new DelayedElementsV2Page(page);
    delayedElementsV2Page.navigateTo();
  });
  test('1. Auto wait for button click and result display', async ({ page }) => {
    //Arrange
    const buttonTestId = 'dti-button-element-2';
    const resultTestId = 'dti-results';
    const expectedMessageFinal = 'You clicked the button! (Delayed)';
    // Locators
    const buttonLocator = page.getByTestId(buttonTestId);
    const resultLocator = page.getByTestId(resultTestId);
    //Act
    await buttonLocator.click();
    //Assert
    await expect(resultLocator).toHaveText(expectedMessageFinal, { timeout: 10_000 });
  });
  test('2. Auto wait for button click and result display - two assertions', async ({ page }) => {
    //Arrange
    const buttonTestId = 'dti-button-element-2';
    const resultTestId = 'dti-results';
    const expectedMessage = 'Processing... Please wait.';
    const expectedMessageFinal = 'You clicked the button! (Delayed)';
    // Locators
    const buttonLocator = page.getByTestId(buttonTestId);
    const resultLocator = page.getByTestId(resultTestId);
    //Act
    await buttonLocator.click();
    //Assert
    await expect(resultLocator).toHaveText(expectedMessage);
    await expect(resultLocator).toHaveText(expectedMessageFinal);
  });
  test('3. Auto wait for button click and result display - two assertions plus wait for element', async ({
    page,
  }) => {
    //Arrange
    const buttonTestId = 'dti-button-element-2';
    const resultTestId = 'dti-results';
    const expectedMessage = 'Processing... Please wait.';
    const expectedMessageFinal = 'You clicked the button! (Delayed)';
    // Locators
    const buttonLocator = page.getByTestId(buttonTestId);
    const resultLocator = page.getByTestId(resultTestId);
    //Act
    await buttonLocator.click();
    //Assert
    resultLocator.waitFor({ state: 'visible' });
    await expect(resultLocator).toHaveText(expectedMessage);
    await expect(resultLocator).toHaveText(expectedMessageFinal, { timeout: 8_000 });
  });
  //   test('2. WFA for button click and result display', async ({ page }) => {
  //     //Arrange
  //     const buttonTestId = 'dti-button-element-1';
  //     const resultTestId = 'dti-results';
  //     const expectedMessage = 'You clicked the button!';
  //     // Locators
  //     const buttonLocator = page.getByTestId(buttonTestId);
  //     const resultLocator = page.getByTestId(resultTestId);
  //     const buttonVisibility = buttonLocator.isVisible();
  //     const resultsVisibility = resultLocator;

  //     expect(buttonVisibility).toBeTruthy();
  //     //Act
  //     await buttonLocator.click();
  //     // expect(resultsVisibility).toBe(true); // will fail the test
  //     expect(resultsVisibility).toBeTruthy();
  //     //Assert
  //     await expect(resultLocator).toHaveText(expectedMessage);
  //   });
});
