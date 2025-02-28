import { Locator, MatcherReturnType, expect as temperatureInRange } from '@playwright/test';

export const expect = temperatureInRange.extend({
  // 1. Function declaration
  async temperatureToBeInRange(
    locator: Locator,
    min: number,
    max: number,
    options?: { timeout: number },
  ): Promise<MatcherReturnType> {
    let message = '';
    let pass = false;
    let actualValue = ''; // Set here just to verify what is current temp value, Type must be corrected from undefined to string

    // Assertion
    try {
      // Verify whether element is visible
      await temperatureInRange(locator).toBeVisible(options);
      // Verify the value of temperature
      const elementValue = await locator.innerText(); // Read value of locator
      const elementValueAsNumber = parseInt(elementValue); // Parse string to number
      const isInRange = elementValueAsNumber >= min && elementValueAsNumber <= max; // Verify whether value is in range
      pass = isInRange; // Overwrite pass = false to pass = true
      actualValue = elementValue; // Just additional info for user -
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      actualValue = error.matcherResult?.actual;
      pass = false; // Not needed here we do not need to overwrite result which is false from the beginning
    }

    if (pass) {
      message = `Passed on: ${new Date().toISOString()}`;
    } else {
      message = `temperatureToBeInRange assertion failed.\n\t 
      You expected the locator to have value between ${min} - ${max} \n\t 
      But got:  ${actualValue}!\n`;
    }
    // This values expected and actual are optional added of method info from the test for future return extending
    return {
      message: () => message,
      pass,
      expected: [min, max],
      actual: actualValue,
    };
  },
});
