import { CustomAttributesPage } from '@_src/pages/out_of_mock/custom-attribute.page';
import { test, expect } from '@playwright/test';

// How to skip the custom attribute from tests:
/* 
1. Disable it globally in playwright.config.ts
2. In the tests which are using custom attribute add line of code under test describe
```typescript
test.use({ testIdAttribute: 'pw-test' });
```
3. The above code overwrites the default settings of getByTestId() method for the file/tests it is used
*/

test.describe('Location object by using data-test id and id', () => {
  let customAttributesPage: CustomAttributesPage;
  // Here we are adding overwriting the default attribute
  test.use({ testIdAttribute: 'pw-test' });
  test.beforeEach('Navigating to custom elements custom attributes page', async ({ page }) => {
    customAttributesPage = new CustomAttributesPage(page);
    await customAttributesPage.navigateTo();
  });
  test('click the button (using betByTestId)', async ({ page }) => {
    // Arrange
    const buttonIDSelector = 'simple-button';
    const buttonResultsTestId = 'results';
    const actualResultText = 'You clicked the button!';
    const buttonElement = page.getByTestId(buttonIDSelector);
    const resultElement = page.getByTestId(buttonResultsTestId);
    // Act
    await buttonElement.click();

    // Assert
    await expect(buttonElement).toBeVisible();
    await expect(resultElement).toHaveText(actualResultText);
  });
  test('click the button (using locator)', async ({ page }) => {
    // const buttonLocatorSelector = '[pw-test=\'simple-button\']';
    const buttonLocatorSelector = '[pw-test="simple-button"]';
    const buttonResultsLocator = '#results';
    const actualResultText = 'You clicked the button!';
    const buttonElement = page.locator(buttonLocatorSelector);
    const resultElement = page.locator(buttonResultsLocator);
    // Act
    await buttonElement.click();

    // Assert
    await expect(buttonElement).toBeVisible();
    await expect(resultElement).toHaveText(actualResultText);
  });
});
