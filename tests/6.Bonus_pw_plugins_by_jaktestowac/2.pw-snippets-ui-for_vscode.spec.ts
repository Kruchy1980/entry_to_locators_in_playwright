/* !!! IMPORTANT: the plugin "Playwright snippets ui for VSCode" need instance of the plugin "Playwright Snippets for VSCode" 
to be workable
1. DESCRIPTION:
This plugin allows user to paste proper parts of code for UI handling
2. USAGE:
1. When preparing new test we can use the plugin from extensions on the side-bar when cursor is in specific place
2. Using proper parts of code can be performed by using search when plugin is opened
!!! IMPORTANT: The part of codes is only template - must be customized by user
!!! ATTENTION: That file is an example only
*/

import { test, expect } from '@playwright/test';

test.describe('Playwright Snippets UI for VSCode handling', () => {
  test.fail('written down with plugin usage', async ({ page }) => {
    // Arrange:
    await page.addLocatorHandler(page.getByText(''), async () => {
      await page.getByRole('button', { name: '' }).click();
    });

    // await page.addLocatorHandler(page.getByText('await elementLocator.screenshot({ path: 'screenshot.png' });

    // Act:
    await page.goto('<validURL>');

    // Assert:
    // await expect(elementLocator).toBeVisible(); // Locator must be valid
    expect(1).toBeGreaterThan(0);
  });
  //   test("", {
  //     annotation: [
  //         { type: 'category', description: 'test description' },
  //     ],
  //   }, async ({ page }) => {
  //     // Arrange:

  //     // Act:

  //     // Assert:

  //   });
  //   test("", {
  //     tag: 'myTagName',
  //   }, async ({ page }) => {
  //     // Arrange:

  //     // Act:

  //     // Assert:

  //   });
});
