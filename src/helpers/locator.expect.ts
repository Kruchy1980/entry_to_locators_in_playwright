import { expect as attributeValidation, Locator, MatcherReturnType } from '@playwright/test';

// Assertions which works on locators needs asynchronous methods that is why we need to use async in Assertion
// All Web First assertions are based on locators
export const expect = attributeValidation.extend({
  async maxLengthValidation(
    locator: Locator,
    expectedValue: number,
    options?: { timeout: number },
  ): Promise<MatcherReturnType> {
    let messageStr = '';
    let pass = false;
    let actualValue = undefined;
    interface MatcherError extends Error {
      matcherResult?: { actual?: unknown };
    }

    try {
      await attributeValidation(locator).toHaveAttribute(
        'maxLength',
        String(expectedValue),
        options,
      );
      pass = true;
    } catch (e: unknown) {
      const typedError = e as MatcherError;
      //   pass = false; not needed
      actualValue = String(typedError.matcherResult?.actual);
      // actualValue = String(e.matcherResult?.actual);
    }

    if (pass) {
      messageStr = 'Passed';
    } else {
      messageStr = `maxLengthValidation() assertion failed. \n You expected locator to have maxlength of ${expectedValue}!\n But got ${actualValue}`;
    }
    return {
      message: () => messageStr,
      pass: pass,
      actual: actualValue,
      expected: expectedValue,
    };
  },
});
