import { SimpleMultipleElementsPage } from '@_src/pages/simple-multiple-elements.page';
import { test, expect } from '@playwright/test';

test.describe('Parameters in methods tests', () => {
  let simpleMultipleElementsPage: SimpleMultipleElementsPage;
  test.beforeEach('Navigate to proper page', async ({ page }) => {
    simpleMultipleElementsPage = new SimpleMultipleElementsPage(page);
    await simpleMultipleElementsPage.navigateTo();
  });
  test('1. Simple locator', async ({ page }) => {
    // Arrange
    const elementRole = 'button';
    const resultsTestId = 'dti-results';
    const expectedMessage = 'You clicked the button!';
    const elementText = 'Click me!';
    // Value declaration with additional parameters
    const buttonLocator = page.getByRole(elementRole, { name: elementText });
    const resultsLocator = page.getByTestId(resultsTestId);
    // Act
    await buttonLocator.click();
    // Assert
    await expect(resultsLocator).toHaveText(expectedMessage);
  });
  test('2. Filter method - simple - one liner', async ({ page }) => {
    // Arrange
    const elementRole = 'button';
    const resultsTestId = 'dti-results';
    const expectedMessage = 'You clicked the button!';
    const elementText = 'Click me!';
    // Value declaration with filter method
    const buttonLocator = page.getByRole(elementRole).filter({ hasText: elementText });
    const resultsLocator = page.getByTestId(resultsTestId);
    // Act
    await buttonLocator.click();
    // Assert
    await expect(resultsLocator).toHaveText(expectedMessage);
  });
  test('3. SOLUTION I Detailed Selector - the same values of buttons', async ({ page }) => {
    // Arrange
    //1. Decalare variable of the element role
    const elementRole = 'button';
    //2. Declare variable of the element text
    const elementText = 'Click';
    //3. Declare variables of specified field of the in specified row for the button we want to click
    const parentRow = 'row';
    const parentText = 'Row 3';
    //4. Declare variables for result display
    const resultsTestId = 'dti-results';
    const expectedMessage = 'You clicked the button! (row 3)';
    // Value declaration with filter method
    //5. Locator for row - simple usage
    const buttonLocator = page.getByRole(parentRow, { name: parentText });
    const specifiedButtonLocator = buttonLocator.getByRole(elementRole, { name: elementText });
    //6. Locator for result
    const resultsLocator = page.getByTestId(resultsTestId);
    // SOLUTION I
    // Act - for simple not one liner
    await specifiedButtonLocator.click();
    // Assert for SOLUTION I
    await expect(resultsLocator).toHaveText(expectedMessage);
  });
  test('3.1 SOLUTION II Detailed Selector - the same values of buttons', async ({ page }) => {
    // Arrange
    //1. Decalare variable of the element role
    const elementRole = 'button';
    //2. Declare variable of the element text
    const elementText = 'Click';
    //3. Declare variables of specified field of the in specified row for the button we want to click
    const parentRow = 'row';
    const parentText = 'Row 3';
    //4. Declare variables for result display
    const resultsTestId = 'dti-results';
    const expectedMessage = 'You clicked the button! (row 3)';
    // Value declaration with filter method
    //6. Locator for button - simple usage - one liner
    const buttonLocatorOneLiner = page
      .getByRole(parentRow, { name: parentText })
      .getByRole(elementRole, { name: elementText });
    //7. Locator for result
    const resultsLocator = page.getByTestId(resultsTestId);
    // SOLUTION II
    // Act - for one liner
    await buttonLocatorOneLiner.click();
    // Assert for SOLUTION II
    await expect(resultsLocator).toHaveText(expectedMessage);
  });
  test('4. Detailed Selector - the same values of buttons - filter method', async ({ page }) => {
    // Arrange
    //1. Decalare variable of the element role
    const elementRole = 'button';
    //2. Declare variable of the element text
    // const elementText = 'Click!'; // This selector is not needed here
    //3. Declare variables of specified field of the in specified row for the button we want to click
    const parentRow = 'row';
    const parentText = 'Row 3';
    //4. Declare variables for result display
    const resultsTestId = 'dti-results';
    const expectedMessage = 'You clicked the button! (row 3)';
    // Value declaration with filter method
    //5. Locator for button - simple usage - one liner
    // const buttonLocatorOneLiner = page
    //   .getByRole(parentRow)
    //   .filter({ has: page.getByText(parentText) })
    //   .getByRole(elementRole, { name: elementText }); // In this method we do not need to use "name:..." because in present Version Playwright do not show the element in browser
    //5. Locator for button simple usage - one liner - without unnecessary elementText
    const buttonLocatorOneLiner = page
      .getByRole(parentRow)
      .filter({ has: page.getByText(parentText) })
      .getByRole(elementRole);
    //6. Locator for result
    const resultsLocator = page.getByTestId(resultsTestId);
    // SOLUTION II
    // Act - for one liner
    await buttonLocatorOneLiner.click();
    // Assert for SOLUTION II
    await expect(resultsLocator).toHaveText(expectedMessage);
  });
});
