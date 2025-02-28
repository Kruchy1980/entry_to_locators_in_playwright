/*
Podziel testy na odrębne scenariusze:
– Poprawne dane.
– Brakujące dane.
– Błędne wartości.
=== For Being verified:
Suma kosztów
Podatek
Koszt transportu
*/
import { RandomShoppingCartPage } from '@_src/pages/for_mocks/random-shopping-cart.page';
import { test, expect } from '@playwright/test';

test.describe('User data tests - mock', () => {
  // The below use is not useful for API mocking
  let randomShoppingCartPage: RandomShoppingCartPage;
  test.beforeAll('Navigate to proper page', async ({ page }) => {
    // BeforeAll is used because no action performed except variable preparation
    randomShoppingCartPage = new RandomShoppingCartPage(page);
    //   await simpleUserPage.navigateTo();
  });
  test.describe('Sum of Costs tests set', () => {
    test('1. Verify sum of costs without tax', async ({ page }) => {
      // Arrange
      const costsSumTestId = 'total-subtotal-price';
      const costsSumLocator = page.getByTestId(costsSumTestId);
      const expectedSumOfCosts = '3500.33';
      // Prepare json object (Optional)
      // Act
      await page.route('/practice/random-shopping-cart-v1.html', async (route) => {
        // Collect response
        const response = await route.fetch();
        // Parse response to json file
        const jsonResponse = await response.json();
        // console.log(jsonResponse);
        // Here modify json (Optional)

        // Pass response to the proper website
        await route.fulfill({ json: jsonResponse });
      });
      await randomShoppingCartPage.navigateTo();
      // Assert
      await expect(costsSumLocator).toHaveText(expectedSumOfCosts);
    });
  });
});
