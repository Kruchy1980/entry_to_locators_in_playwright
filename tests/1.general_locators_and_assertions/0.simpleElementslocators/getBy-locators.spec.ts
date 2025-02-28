// import { PracticePage } from '@_src/pages/practice.page';
import { SimpleElementsPage } from '@_src/pages/out_of_mock/simple-elements.page';
import { test, expect } from '@playwright/test';

test.describe('Simple locators getBy... handling', () => {
  let simpleElementsPage: SimpleElementsPage;
  test.beforeEach(async ({ page }) => {
    simpleElementsPage = new SimpleElementsPage(page);
    await simpleElementsPage.navigateTo();
  });

  test('1. GetByRole selector @simple', async ({ page }) => {
    // Arrange - prepare locator button
    // const elementLocator = page.getByRole('button');
    const elementLocator = page.getByRole('button', { name: 'Click me!' });

    await expect(elementLocator).toBeVisible();
  });
  test('2. GetByText selector @simple', async ({ page }) => {
    // Arrange - prepare locator button
    // 1. get button by text
    const elementLocatorText = page.getByText('Click me!');
    await expect(elementLocatorText).toBeVisible();
    // 2. click the button
    await elementLocatorText.click();
    // 3. Verify whether proper information is displayed after clicking button
    const resultTextBox = page.getByTestId('dti-results');
    await expect(resultTextBox).toHaveText('You clicked the button!');
  });
  // test('3. GetByLabel selector @simple', async ({ page }) => {
  //   // Arrange - prepare locator button
  //   // 1. get button by label
  //   const elementLocatorLabel = page.getByLabel('Some text for label');
  //   // await expect(elementLocatorLabel).toBeVisible();
  //   expect(elementLocatorLabel.textContent()).toBe('Some text for label');
  //   // 2. click the button
  //   // await elementLocatorText.click();
  //   // // 3. Verify whether proper information is displayed after clicking button
  //   // const resultTextBox = page.getByTestId('dti-results');
  //   // await expect(resultTextBox).toHaveText('You clicked the button!');
  // });
});
