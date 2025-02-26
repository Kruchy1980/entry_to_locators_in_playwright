import { NestedTablesPage } from '@_src/pages/nested_tables.page';
import { test, expect } from '@playwright/test';

test.describe('Nested tables handling', () => {
  let nestedTablesPage: NestedTablesPage;
  test.beforeEach('Navigate to proper page', async ({ page }) => {
    nestedTablesPage = new NestedTablesPage(page);
    await nestedTablesPage.navigateTo();
  });
  test('1. Click selected button using getByRole', async ({ page }) => {
    // Txt which should be displayed - You clicked the button! (row 2-1-2)
    // Arrange
    // Selectors
    const expectedMessage = 'You clicked the button! (row 2-1-2)';
    const resultsTestId = 'dti-results';
    // For button locator
    const allRows = 'row';
    const firstRowText = 'Row 2.0';
    const secondRowText = 'Row 1';
    const thirdRowText = 'Row 2';
    const buttonSelector = 'button';

    // Arrange - Locators
    const resultsLocator = page.getByTestId(resultsTestId);
    // Button locator piece by piece
    const buttonLocator = page
      .getByRole(allRows, { name: firstRowText })
      .getByRole(allRows, { name: secondRowText })
      .getByRole(allRows, { name: thirdRowText })
      .getByRole(buttonSelector);
    // Act
    await buttonLocator.click();
    // Assert
    await expect(resultsLocator).toHaveText(expectedMessage);
  });
  test('2. Click selected button using filter', async ({ page }) => {
    // Txt which should be displayed - You clicked the button! (row 1-3)
    // Txt which should be displayed - You clicked the button! (row 2-3)
    // Txt which should be displayed - You clicked the button! (row 3-3)
    // Arrange
    // const expectedMessage = 'You clicked the button! (row 1-3)';
    const resultsTestId = 'dti-results';
    const allRows = 'row';
    const setOfButtonRows = 'Z';
    const setOfNotButtonsRows = 'Y';
    const buttonSelector = 'button';
    // Arrange - Locators
    const resultsLocator = page.getByTestId(resultsTestId);
    const buttonsLocator = page
      .getByRole(allRows)
      .filter({ hasText: setOfButtonRows, hasNotText: setOfNotButtonsRows })
      .getByRole(buttonSelector);
    // Act
    const buttonsQuantity = await buttonsLocator.count();
    // await buttonLocator.click();
    // // Assert
    for (let i = 0; i < buttonsQuantity; i++) {
      buttonsLocator.nth(i).click();
      //   console.log(await resultsLocator.textContent());
      await expect(resultsLocator).toHaveText(`You clicked the button! (row ${i + 1}-3)`);
    }
    // await expect(resultsLocator).toHaveText(expectedMessage);
  });
});
