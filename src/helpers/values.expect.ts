// import expect module and adapt it's name to other one ex = baseExpect
import { expect as baseExpect, MatcherReturnType } from '@playwright/test';

// Prepare assertion by extending new module - extend the PW base extend by baseExpect and export the expect
export const expect = baseExpect.extend({
  // Here add code for assertion - function customized
  toBeOneOfValues(actualValue: number, array: number[]): MatcherReturnType {
    // Add logic to assertion
    let message = '';
    const isOnList = array.includes(actualValue);
    if (isOnList) {
      message = 'Passed';
    } else {
      message = `toBeOneOfValues() assertion failed. \n You expected value ${actualValue} will be on the list: [${array}]!`;
    }
    return {
      message: () => message,
      pass: isOnList,
    };
  },
});
