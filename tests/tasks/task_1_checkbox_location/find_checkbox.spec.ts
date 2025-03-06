import { SimpleElementsPage } from '@_src/pages/out_of_mock/simple-elements.page';
import { test, expect } from '@playwright/test';

test.describe('Location of checkbox element', () => {
  let simpleElementsPage: SimpleElementsPage;
  //   const elements: string[] = ['ID', 'Class', 'role', 'test ID', 'custom attribute ckbx'];

  test.beforeEach('Set and navigate to proper page', async ({ page }) => {
    // Arrange b4 each test
    simpleElementsPage = new SimpleElementsPage(page);
    await simpleElementsPage.navigateTo();
  });
  test('1. Find checkbox by ID and properly verify', async ({ page }) => {
    // ACT
    const checkboxElement = page.locator('#id-checkbox');

    // Assert
    await expect(checkboxElement).toBeVisible();
  });
  test('2. Find checkbox by class attribute and properly verify', async ({ page }) => {
    // ACT
    const checkboxElement = page.locator('.my-checkbox');

    // Assert
    await expect(checkboxElement).toBeVisible();
  });
  test('3. Find checkbox by role and properly verify', async ({ page }) => {
    // ACT
    const checkboxElement = page.getByRole('checkbox');

    // Assert
    await expect(checkboxElement).toBeVisible();
  });
  test('4. Find checkbox by data-test-id and properly verify', async ({ page }) => {
    // ACT
    const checkboxElement = page.getByTestId('dti-checkbox');

    // Assert
    await expect(checkboxElement).toBeVisible();
  });
  test('5. Find checkbox by Attribute ckbx and properly verify', async ({ page }) => {
    // ACT
    const checkboxElement = page.locator("[ckbx='val1']");
    const checkboxElement1 = await page.getAttribute('input', 'ckbx');

    // Assert
    await expect(checkboxElement).toBeVisible();
    expect(checkboxElement1).toContain('val1');
  });
  //   elements.forEach((el, i) => {
  //     test(`${i + 1}. Find checkbox element by ${el} and verify if visible on page`, async ({
  //       page,
  //     }) => {
  //         // Arrange
  //         const elementsArray:string[] = ["[ckbx='val1']"]
  //       // ACT
  //       const checkboxElement = page.locator("[ckbx='val1']");

  //       // Assert
  //       await expect(checkboxElement).toBeVisible();
  //     });
  //   });
});
