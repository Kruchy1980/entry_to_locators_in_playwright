/* SHADOW DOM - mechanism which allows to close part of HTML, CSS and JS in isolated ether
1. Shadow DOM behavior and dependency:
- Code in the shadow do not impacts for the whole page
- Code not included in Shadow part do not impacts the shadowed Code
2. Advantages and profits
- Isolates the styles
- Allows for Mightiness (modularność) and reusability
- Secures before modifications
- Easier debugging
    - in some cases
3. Disadvantages and  challenges
- Accessibility and automatization are difficult
- Complex debugging (in advanced applications)
- Styling and consistency with rest of application
- Compatibility of different frames
We have 2 mechanisms of Shadow DOM
- Open - easy access - by shadow root
- Closed - access is difficult
*/

import { ShadowSimplePage } from '@_src/pages/shadow_dom/shadow-simple.page';
import { test, expect } from '@playwright/test';

test.describe('Shadow DOM Handling', () => {
  let shadowSimplePage: ShadowSimplePage;
  test.beforeEach(async ({ page }) => {
    shadowSimplePage = new ShadowSimplePage(page);
    await shadowSimplePage.navigateTo();
  });
  test('1. No shadow Dom Test', async ({ page }) => {
    // Arrange
    const nameInputTestId = 'name-input';
    const submitButtonTestId = 'submit';
    const resultsTestId = 'results';
    const providedNameText = 'Alfons';
    const expectedTextDisplay = `Hello, ${providedNameText}!`;
    // Locators
    const nameInputLocator = page.getByTestId(nameInputTestId);
    const submitButtonLocator = page.getByTestId(submitButtonTestId);
    const resultsDisplayLocator = page.getByTestId(resultsTestId);
    // Act
    await nameInputLocator.fill(providedNameText);
    await submitButtonLocator.click();
    // Assert
    await expect(resultsDisplayLocator).toHaveText(expectedTextDisplay);
  });
  test('2. Open shadow Dom Test', async ({ page }) => {
    // Arrange
    const nameInputTestId = 'shadow-name-input';
    const submitButtonTestId = 'shadow-submit';
    const resultsTestId = 'shadow-results';
    const providedNameText = 'Alfons';
    const expectedTextDisplay = `Hello, ${providedNameText}!`;
    // Locators
    const nameInputLocator = page.getByTestId(nameInputTestId);
    const submitButtonLocator = page.getByTestId(submitButtonTestId);
    const resultsDisplayLocator = page.getByTestId(resultsTestId);
    // Act
    await nameInputLocator.fill(providedNameText);
    await submitButtonLocator.click();
    // Assert
    await expect(resultsDisplayLocator).toHaveText(expectedTextDisplay);
  });
  test('3. Nested shadow Dom Test', async ({ page }) => {
    // Arrange
    const nameInputTestId = 'nested-shadow-name-input';
    const submitButtonTestId = 'nested-shadow-submit';
    const resultsTestId = 'nested-shadow-results';
    const providedNameText = 'Alfons';
    const expectedTextDisplay = `Hello, ${providedNameText}!`;
    // Locators
    const nameInputLocator = page.getByTestId(nameInputTestId);
    const submitButtonLocator = page.getByTestId(submitButtonTestId);
    const resultsDisplayLocator = page.getByTestId(resultsTestId);
    // Act
    await nameInputLocator.fill(providedNameText);
    await submitButtonLocator.click();
    // Assert
    await expect(resultsDisplayLocator).toHaveText(expectedTextDisplay);
  });
  test.fail('4. Closed shadow Dom Test - not supported by Playwright', async ({ page }) => {
    // Arrange
    const nameInputTestId = 'closed-shadow-name-input';
    const submitButtonTestId = 'closed-shadow-submit';
    const resultsTestId = 'closed-shadow-results';
    const providedNameText = 'Alfons';
    const expectedTextDisplay = `Hello, ${providedNameText}!`;
    // Locators
    const nameInputLocator = page.getByTestId(nameInputTestId);
    const submitButtonLocator = page.getByTestId(submitButtonTestId);
    const resultsDisplayLocator = page.getByTestId(resultsTestId);
    // Act
    await nameInputLocator.fill(providedNameText, { timeout: 5_000 });
    await submitButtonLocator.click();
    // Assert
    await expect(resultsDisplayLocator).toHaveText(expectedTextDisplay);
  });
});
