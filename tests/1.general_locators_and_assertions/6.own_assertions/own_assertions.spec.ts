import { test } from '@playwright/test';
import { expect } from '@_src/helpers/values.expect';

test.describe('Own Assertions handling', () => {
  test('1. First embedded assertion - example - simple test', () => {
    //Arrange
    const myValue = 2;
    const possibleValues = [1, 2, 3];
    //Act
    //Assert
    expect(possibleValues).toContain(myValue);
  });
  test('2. First embedded assertion - divided into 2 steps', () => {
    //Arrange
    const myValue = 2;
    const possibleValues = [1, 2, 3];
    //Act
    //Assert
    const isOnList = possibleValues.includes(myValue);
    expect(isOnList).toBeTruthy();
  });
  test('3. First own created assertion - example - simple test', () => {
    //Arrange
    const myValue = 2;
    const possibleValues = [1, 2, 3];
    //Act
    //Assert - own created custom - create new file in ex new src folder helpers and add there assertion function
    expect(myValue).toBeOneOfValues(possibleValues);
  });
});
