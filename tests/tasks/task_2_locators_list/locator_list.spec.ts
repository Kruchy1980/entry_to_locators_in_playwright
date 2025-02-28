import { SimpleMultipleElementsPage } from '@_src/pages/out_of_mock/simple-multiple-elements.page';
import { test, expect } from '@playwright/test';

test.describe('List of locators handling', () => {
  let simpleMultipleElementsPage: SimpleMultipleElementsPage;
  test.beforeEach('Navigate to proper page', async ({ page }) => {
    simpleMultipleElementsPage = new SimpleMultipleElementsPage(page);
    await simpleMultipleElementsPage.navigateTo();
  });
  test('Check All existed checkboxes', async ({ page }) => {
    // Arrange
    const checkboxSelector = 'checkbox';
    const resultsSelector = 'dti-results';
    const quantityOfExistedCheckboxes = 5;
    // const resultMessage =
    // Checkbox is checked! (Opt 1!)
    const resultsLocator = page.getByTestId(resultsSelector);
    const checkboxLocator = page.getByRole(checkboxSelector);

    // Act
    const checkboxesQuantity = await checkboxLocator.count();
    expect.soft(checkboxesQuantity).toBe(quantityOfExistedCheckboxes);
    // console.log('Quantity of checkboxes:', await checkboxesQuantity);
    // Assert
    for (let i = 0; i < checkboxesQuantity; i++) {
      await checkboxLocator.nth(i).check();
      //   console.log(await resultsLocator.textContent());
      await expect(resultsLocator).toHaveText(`Checkbox is checked! (Opt ${i + 1}!)`);
    }
  });
});
