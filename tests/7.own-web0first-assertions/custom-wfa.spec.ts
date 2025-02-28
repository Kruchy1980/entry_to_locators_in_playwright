import { NotPresentElementsPage } from '@_src/pages/not-present-elements.page';
import { test, expect } from '@playwright/test';
import { expect as validateAttribute } from '@_src/helpers/locator.expect';

test.describe('Not Present Elements handling', () => {
  let notPresentElementsPage: NotPresentElementsPage;
  test.beforeEach('Navigate to proper page', async ({ page }) => {
    notPresentElementsPage = new NotPresentElementsPage(page);
    notPresentElementsPage.navigateTo();
  });
  test('1. Input max length - simple test - no custom assert', async ({ page }) => {
    //Arrange
    const inputTestId = 'dti-input';
    const expectedMaxLength = 64;

    //Locators
    const inputLocator = page.getByTestId(inputTestId);
    //Act
    //Assert
    await expect(inputLocator).toHaveAttribute('maxLength', String(expectedMaxLength), {
      timeout: 10000,
    });
  });
  test('2. Input max length - simple test - custom assert', async ({ page }) => {
    //Arrange
    const inputTestId = 'dti-input';
    const expectedMaxLength = 64;

    //Locators
    const inputLocator = page.getByTestId(inputTestId);
    //Act
    //Assert
    await validateAttribute(inputLocator).maxLengthValidation(expectedMaxLength);
  });
});
