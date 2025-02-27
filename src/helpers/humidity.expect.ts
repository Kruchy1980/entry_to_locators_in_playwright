import { expect as humidityDisplay, MatcherReturnType } from '@playwright/test';

export const expect = humidityDisplay.extend({
  // 1. Verification of correct signs
  toContainPercentageSign(humidityText: string): MatcherReturnType {
    let message = '';
    const hasPercentageSign = humidityText.includes('%');

    if (hasPercentageSign) {
      message = `HumidityText ${humidityText} is displayed properly with '%' sign`;
    } else {
      message = `HumidityText ${humidityText} is incorrectly displayed - do not contains '%' sign`;
    }
    return {
      message: () => message,
      pass: hasPercentageSign,
    };
  },
  //2. Verify whether humidity is in proper range 0-100 fixed
  toBeInProperRange(humidityValue: string): MatcherReturnType {
    let message = '';
    let humidityNumber: number = 0;
    const min = 0;
    const max = 100;
    const hasPercentageSign = humidityValue.includes('%');
    if (hasPercentageSign) {
      const indexOfPercentage = humidityValue.indexOf('%');
      humidityNumber = parseInt(humidityValue.slice(0, indexOfPercentage));
    }
    const isFromRange = humidityNumber >= min && humidityNumber <= max;

    if (isFromRange) {
      message = `Humidity ${humidityNumber} is from proper range ${min}-${max}`;
    } else {
      message = `humidityNumber ${humidityNumber} is not from proper range ${min}-${max}!`;
    }
    return {
      message: () => message,
      pass: isFromRange,
    };
  },
  // 3. Verify whether humidity is in proper range and displayed with % sign
  toBeCorrectlyDisplayedAndInSpecificRange(
    humidity: string,
    minDynamic: number,
    maxDynamic: number,
  ): MatcherReturnType {
    let correctness: boolean;
    let message = '';
    let humidityNumber: number = 0;
    const hasPercentageSign = humidity.includes('%');
    if (hasPercentageSign) {
      const indexOfPercentage = humidity.indexOf('%');
      humidityNumber = parseInt(humidity.slice(0, indexOfPercentage));
    }
    const isFromRange = humidityNumber >= minDynamic && humidityNumber <= maxDynamic;

    if (isFromRange && hasPercentageSign) {
      message = `Humidity is displayed Correctly with '%' sign and in range ${minDynamic}-${maxDynamic}`;
      correctness = true;
    } else {
      message = `Humidity is not displayed correctly`;
      correctness = false;
    }
    return {
      message: () => message,
      pass: correctness,
    };
  },
});
