/* I frame is common HTML nested in main HTML Document
Allows to:
- nest other webpage inside other webpage
1. Accessibility and automatization:
- IFrame content is independent of main DOM
- Localization of IFrame without unique ID can be a challenge
2. Styling and consistency with rest of application
- some of iframes are settled as hidden or have restricted dimensions
- compatibility with other testing frameworks - is totally different 
*/

import { IFrameSimplePage } from '@_src/pages/i_frames_pages/i_frame-simple.page';
import { test, expect } from '@playwright/test';

test.describe('IFrames handling', () => {
  let iframeSimplePage: IFrameSimplePage;
  test.beforeEach('Navigate to proper page', async ({ page }) => {
    iframeSimplePage = new IFrameSimplePage(page);
    await iframeSimplePage.navigateTo();
  });
  test('1. Iframe simple form handling', async ({ page }) => {
    // Arrange
    const iframeTestId = 'dti-simple-iframe';
    const nameInputTestId = 'name-input';
    const submitButtonTestId = 'submit';
    const resultTestId = 'results';
    const expectedName = 'John';
    const expectedValue = `Hello, ${expectedName}!`;

    // Iframe content preparation as first
    const iframeContent = page.getByTestId(iframeTestId).contentFrame();

    // Locators
    const submitButtonLocator = iframeContent.getByTestId(submitButtonTestId);
    const nameInputLocator = iframeContent.getByTestId(nameInputTestId);
    const resultsLocator = iframeContent.getByTestId(resultTestId);

    // Act
    await nameInputLocator.fill(expectedName);

    await submitButtonLocator.click();

    // Assert
    await expect(resultsLocator).toHaveText(expectedValue);
  });
});
