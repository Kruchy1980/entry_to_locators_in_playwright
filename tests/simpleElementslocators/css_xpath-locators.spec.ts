// import { PracticePage } from '@_src/pages/practice.page';
import { SimpleElementsPage } from '@_src/pages/simple-elements.page';
import { test, expect } from '@playwright/test';

test.describe('Simple locators getBy... handling', () => {
  let simpleElementsPage: SimpleElementsPage;
  test.beforeEach(async ({ page }) => {
    simpleElementsPage = new SimpleElementsPage(page);
    await simpleElementsPage.navigateTo();
  });

  test('1. CSS selector - ID @advance', async ({ page }) => {
    // Arrange - prepare locator button
    const elementLocator = page.locator('#id-label-element');

    await expect(elementLocator).toBeVisible();
    await expect(elementLocator).toHaveText('Some text for label');
  });
  test('2. XPath selector - ID @advance', async ({ page }) => {
    // Arrange - prepare locator button
    const elementLocator = page.locator('//*[@id="id-label-element"]');

    await expect(elementLocator).toBeVisible();
    await expect(elementLocator).toHaveText('Some text for label');
  });
});
