import { SimpleElementsPage } from '@_src/pages/simple-elements.page';
import test from '@playwright/test';

test.describe('Simple locators handling', () => {
  let simpleElementsPage: SimpleElementsPage;
  test('First locator', async ({ page }) => {
    // Arrange
    simpleElementsPage = new SimpleElementsPage(page);
    // Act
    await simpleElementsPage.navigateTo();
  });
});
