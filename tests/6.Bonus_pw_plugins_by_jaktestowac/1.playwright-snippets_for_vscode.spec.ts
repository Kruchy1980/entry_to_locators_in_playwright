/* eslint-disable no-console */
/*
How to use PW Snippets for VSCode by jaktestowac.pl
1. Install proper plugin "Playwright Snippets for VSCode" from plugins
2. Start to type code using pw prefix ex (pw)
3. From the list of displayed method choose that one which interests You mostly
- in this example the pw-describe-full is chosen
4. Select interested option by clicking on it or choose it using arrows and press enter
!!! The chosen part of test set is displayed - slightly customized by user
*/

import { test, expect } from '@playwright/test';

test.describe('Tests Set', () => {
  test.beforeAll(async () => {
    // TODO: prepare the data before all test
    console.log('Before All');
  });

  test.beforeEach(async () => {
    // TODO: open the page before each test
    console.log('Before Each');
  });

  test.afterEach(async () => {
    // TODO: clear the data after each test
    console.log('After AlEach');
  });

  test.afterAll(async () => {
    // TODO: clear the data after all tests
    console.log('After All');
  });

  test('Test_Title-2', async () => {
    // Arrange:
    // our code starts here
    // Act:
    // Assert:
    expect(1).toBeGreaterThanOrEqual(0);
  });
});
