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

import { IFrameRegistrationPage } from '@_src/pages/i_frames_pages/i_frame-user_register.page';
import { test, expect } from '@playwright/test';

test.describe('IFrames handling', () => {
  let iframeRegistrationPage: IFrameRegistrationPage;
  test.beforeEach('Navigate to proper page', async ({ page }) => {
    iframeRegistrationPage = new IFrameRegistrationPage(page);
    await iframeRegistrationPage.navigateTo();
  });
  test('1. Nested iframe handling', async ({ page }) => {
    // Arrange
    const mainIframeTestId = 'dti-simple-iframe';
    const nestedIframeId = '#inner-iframe';
    const usernameInputTestId = 'username-input';
    const ageInputTestId = 'age-input';
    const passwordInputTestId = 'password-input';
    const registerButtonTestId = 'register-submit';
    const registerResultTestId = 'register-results';
    const actualName = 'John';
    const actualAge = '22';
    const actualPassword = 'tester123';
    const expectedResultTextContent = `Registration successful! Username: ${actualName}, Age: ${actualAge}, Password: `;

    // Iframe content preparation as first
    const mainFrameLocator = page.getByTestId(mainIframeTestId).contentFrame();
    const nestedIframeContent = mainFrameLocator.locator(nestedIframeId).contentFrame();

    // Locators
    const registerButtonLocator = nestedIframeContent.getByTestId(registerButtonTestId);
    const usernameInputLocator = nestedIframeContent.getByTestId(usernameInputTestId);
    const ageInputLocator = nestedIframeContent.getByTestId(ageInputTestId);
    const passwordInputLocator = nestedIframeContent.getByTestId(passwordInputTestId);
    const registerResultLocator = nestedIframeContent.getByTestId(registerResultTestId);

    // Act
    await usernameInputLocator.fill(actualName);
    await ageInputLocator.fill(actualAge);
    await passwordInputLocator.fill(actualPassword);
    await registerButtonLocator.click();

    // Assert
    await expect(registerResultLocator).toContainText(expectedResultTextContent);
  });
});
