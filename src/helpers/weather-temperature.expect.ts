import { MatcherReturnType, expect as beingInRange } from '@playwright/test';

export const expect = beingInRange.extend({
  // Function preparation
  toBeInRange(actualTemperature: string, min: number, max: number): MatcherReturnType {
    const actualTemperatureNumber = parseInt(actualTemperature);
    let message = '';
    const isInRange = actualTemperatureNumber >= min && actualTemperatureNumber <= max;

    if (isInRange) {
      message = `The temperature  ${actualTemperatureNumber} is in range: ${min}-${max} :)`;
    } else {
      message = `The temperature  ${actualTemperatureNumber} is NOT in range: ${min}-${max} :)`;
    }
    return {
      message: () => message,
      pass: isInRange,
    };
  },
});
