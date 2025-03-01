/*
Podziel testy na odrębne scenariusze:
– Poprawne dane.
– Brakujące dane.
– Błędne wartości.
=== For Being verified:
Suma kosztów
Podatek
Koszt transportu
Sprawdzenie req'ów - dopisane scenariusze negatywne tylko:
1. All calculations of tax, shipping, and total are based on the subtotal of the products.
2. Shipping and tax are calculated as 10% of the subtotal.
3. The total amount is the sum of the subtotal, shipping, and tax.
4. Only products with valid data are included in the calculations.
5. Products with invalid data are ignored in the calculations, but they are still displayed in the list.
============================================
A) For pure sum of elements:
2. Pure sum of costs without tax and shipping - no decimal prices - bug - req no 4 and req no 5 
3. Pure sum of costs without tax and shipping - incorrect data - subtotal = string
4. Pure sum of costs without tax and shipping - incorrect data - empty product display
5. Pure sum of costs without tax and shipping - empty product among others display and calculation - bug - no calculation at all
B) For sum of subtotal and shipping
2. Shipping 10% of subtotal calculation - incorrect data - numbers = strings' - req 2, 4, 5
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
    test('1. Pure sum of costs without tax and shipping - correct data', async ({ page }) => {
      // Arrange
      const costsSumTestId = 'total-subtotal-price';
      const costsSumLocator = page.getByTestId(costsSumTestId);
      const expectedSumOfCosts = '249.73';
      // Prepare json object (Optional)
      const mockData = {
        cartItems: [
          {
            product: { id: 26, name: 'Makeup Kit', price: 80.21, icon: '💄' },
            quantity: 3,
            subtotal: 240.63,
          },
          {
            product: { id: 2, name: 'Apple', price: 4.55, icon: '🍎' },
            quantity: 2,
            subtotal: 9.1,
          },
        ],
      };
      // Act
      await page.route('/api/v1/data/random/ecommerce-shopping-cart-simple', async (route) => {
        // Collect response
        // const response = await route.fetch();
        await route.fetch();
        // Parse response to json file
        // const jsonResponse = await response.json();
        // // eslint-disable-next-line no-console
        // console.log(jsonResponse);
        // Here modify json (Optional)
        // Pass response to the proper website
        await route.fulfill({ json: mockData });
      });

      //   await page.goto('/practice/random-shopping-cart-v1.html');
      await randomShoppingCartPage.navigateTo();
      // Assert

      await expect(costsSumLocator).toHaveText(expectedSumOfCosts);
    });
    test('2. Pure sum of costs without tax and shipping - no decimal prices', async ({ page }) => {
      // Arrange
      const costsSumTestId = 'total-subtotal-price';
      const costsSumLocator = page.getByTestId(costsSumTestId);
      const expectedSumOfCosts = '248';
      // Prepare json object (Optional)
      const mockData = {
        cartItems: [
          {
            product: { id: 26, name: 'Makeup Kit', price: 80, icon: '💄' },
            quantity: 3,
            subtotal: 240,
          },
          {
            product: { id: 2, name: 'Apple', price: 4, icon: '🍎' },
            quantity: 2,
            subtotal: 8,
          },
        ],
      };
      // Act
      await page.route('/api/v1/data/random/ecommerce-shopping-cart-simple', async (route) => {
        // Collect response
        // const response = await route.fetch();
        await route.fetch();
        // Parse response to json file
        // const jsonResponse = await response.json();
        // // eslint-disable-next-line no-console
        // console.log(jsonResponse);
        // Here modify json (Optional)
        // Pass response to the proper website
        await route.fulfill({ json: mockData });
      });

      //   await page.goto('/practice/random-shopping-cart-v1.html');
      await randomShoppingCartPage.navigateTo();
      // Assert
      await expect(costsSumLocator).toHaveText(expectedSumOfCosts);
    });
    test('3. Pure sum of costs without tax and shipping - incorrect data - subtotal = string', async ({
      page,
    }) => {
      // Arrange
      const costsSumTestId = 'total-subtotal-price';
      const costsSumLocator = page.getByTestId(costsSumTestId);
      const expectedSumOfCosts = 'NaN';
      // Prepare json object (Optional)
      const mockData = {
        cartItems: [
          {
            product: { id: 26, name: 'Makeup Kit', price: 80, icon: '💄' },
            quantity: 3,
            subtotal: '240',
          },
          {
            product: { id: 2, name: 'Apple', price: 4, icon: '🍎' },
            quantity: 2,
            subtotal: 8,
          },
        ],
      };
      // Act
      await page.route('/api/v1/data/random/ecommerce-shopping-cart-simple', async (route) => {
        // Collect response
        // const response = await route.fetch();
        await route.fetch();
        // Parse response to json file
        // const jsonResponse = await response.json();
        // // eslint-disable-next-line no-console
        // console.log(jsonResponse);
        // Here modify json (Optional)
        // Pass response to the proper website
        await route.fulfill({ json: mockData });
      });

      //   await page.goto('/practice/random-shopping-cart-v1.html');
      await randomShoppingCartPage.navigateTo();
      // Assert
      await expect(costsSumLocator).toHaveText(expectedSumOfCosts);
    });
    test('4. Pure sum of costs without tax and shipping - incorrect data - empty product among others display and calculation', async ({
      page,
    }) => {
      // Arrange
      const costsSumTestId = 'total-subtotal-price';
      const costsSumLocator = page.getByTestId(costsSumTestId);
      const expectedSumOfCosts = '28.55';
      // Prepare json object (Optional)
      const mockData = {
        cartItems: [
          {
            product: {},
            quantity: 3,
            subtotal: 240,
          },
          {
            product: { id: 2, name: 'Apple', price: 4, icon: '🍎' },
            quantity: 2,
            subtotal: 8,
          },
          {
            product: { id: 2, name: 'Apple', price: 5.11, icon: '🍎' },
            quantity: 4,
            subtotal: 20.55,
          },
        ],
      };
      // Act
      await page.route('/api/v1/data/random/ecommerce-shopping-cart-simple', async (route) => {
        // Collect response
        // const response = await route.fetch();
        await route.fetch();
        // Parse response to json file
        // const jsonResponse = await response.json();
        // // eslint-disable-next-line no-console
        // console.log(jsonResponse);
        // Here modify json (Optional)
        // Pass response to the proper website
        await route.fulfill({ json: mockData });
      });

      //   await page.goto('/practice/random-shopping-cart-v1.html');
      await randomShoppingCartPage.navigateTo();
      // Assert
      await expect(costsSumLocator).toHaveText(expectedSumOfCosts);
    });
    test('5. Pure sum of costs without tax and shipping - incorrect data - empty product among others display and calculation', async ({
      page,
    }) => {
      // Arrange
      const costsSumTestId = 'total-subtotal-price';
      const costsSumLocator = page.getByTestId(costsSumTestId);
      const expectedSumOfCosts = '28.55';
      // Prepare json object (Optional)
      const mockData = {
        cartItems: [
          {
            product: {},
            quantity: 3,
            subtotal: 240,
          },
          {
            product: { id: 2, name: 'Apple', price: 4, icon: '🍎' },
            quantity: 2,
            subtotal: 8,
          },
          {
            product: { id: 2, name: 'Apple', price: 5.11, icon: '🍎' },
            quantity: 4,
            subtotal: 20.55,
          },
        ],
      };
      // Act
      await page.route('/api/v1/data/random/ecommerce-shopping-cart-simple', async (route) => {
        // Collect response
        // const response = await route.fetch();
        await route.fetch();
        // Parse response to json file
        // const jsonResponse = await response.json();
        // // eslint-disable-next-line no-console
        // console.log(jsonResponse);
        // Here modify json (Optional)
        // Pass response to the proper website
        await route.fulfill({ json: mockData });
      });

      //   await page.goto('/practice/random-shopping-cart-v1.html');
      await randomShoppingCartPage.navigateTo();
      // Assert
      await expect(costsSumLocator).toHaveText(expectedSumOfCosts);
    });
  });
  test.describe('Shipping handling tests set', () => {
    test('1. Shipping 10% of subtotal calculation - correct data', async ({ page }) => {
      // Arrange
      const shippingTestId = 'shipping-cost';
      const shippingLocator = page.getByTestId(shippingTestId);
      const subtotalPriceTestId = 'total-subtotal-price';
      const subtotalPriceLocator = page.getByTestId(subtotalPriceTestId);
      const expectedShippingPrice = '26.48';
      const expectedSubtotalPrice = '264.8';

      // Mock preparation
      const mockData = {
        cartItems: [
          {
            product: { id: 26, name: 'Makeup Kit', price: 80, icon: '💄' },
            quantity: 3,
            subtotal: 240,
          },
          {
            product: { id: 2, name: 'Apple', price: 4, icon: '🍎' },
            quantity: 2,
            subtotal: 8,
          },
          {
            product: { id: 5, name: 'Cookie', price: 4.2, icon: '🍩' },
            quantity: 4,
            subtotal: 16.8,
          },
        ],
      };
      // Act
      await page.route('/api/v1/data/random/ecommerce-shopping-cart-simple', async (route) => {
        // Collecting response
        await route.fetch();
        // Feed the UI
        await route.fulfill({ json: mockData });
      });
      await randomShoppingCartPage.navigateTo();
      // Assert
      // 1. Just because the total was verified in other tests it is not main focus of the test -
      // that is why here I added soft assertion
      await expect.soft(subtotalPriceLocator).toHaveText(expectedSubtotalPrice);
      await expect(shippingLocator).toHaveText(expectedShippingPrice);
    });
    test('2. Shipping 10% of subtotal calculation - incorrect data - numbers = strings', async ({
      page,
    }) => {
      // Arrange
      const shippingTestId = 'shipping-cost';
      const shippingLocator = page.getByTestId(shippingTestId);
      const subtotalPriceTestId = 'total-subtotal-price';
      const subtotalPriceLocator = page.getByTestId(subtotalPriceTestId);
      const expectedShippingPrice = '26.48';
      const expectedSubtotalPrice = '264.8';

      // Mock preparation
      const mockData = {
        cartItems: [
          {
            product: { id: 26, name: 'Makeup Kit', price: 80, icon: '💄' },
            quantity: 3,
            subtotal: '240',
          },
          {
            product: { id: 2, name: 'Apple', price: 4, icon: '🍎' },
            quantity: 2,
            subtotal: 8,
          },
          {
            product: { id: 5, name: 'Cookie', price: '4.2', icon: '🍩' },
            quantity: 4,
            subtotal: 16.8,
          },
        ],
      };
      // Act
      await page.route('/api/v1/data/random/ecommerce-shopping-cart-simple', async (route) => {
        // Collecting response
        await route.fetch();
        // Feed the UI
        await route.fulfill({ json: mockData });
      });
      await randomShoppingCartPage.navigateTo();
      // Assert
      // 1. Just because the total was verified in other tests it is not main focus of the test -
      // that is why here I added soft assertion
      await expect.soft(subtotalPriceLocator).toHaveText(expectedSubtotalPrice);
      await expect(shippingLocator).toHaveText(expectedShippingPrice);
    });
    test('3. Shipping 10% of subtotal calculation - correct data - rounding (optional - not described in reqs - no border values tested)', async ({
      page,
    }) => {
      // Arrange
      const shippingTestId = 'shipping-cost';
      const subtotalPriceTestId = 'total-subtotal-price';
      const expectedShippingPrice = '26.49';
      const expectedSubtotalPrice = '264.85';
      const subtotalPriceLocator = page.getByTestId(subtotalPriceTestId);
      const shippingPriceLocator = page.getByTestId(shippingTestId);

      // Mock preparation
      const mockData = {
        cartItems: [
          {
            product: { id: 26, name: 'Makeup Kit', price: 80.01, icon: '💄' },
            quantity: 3,
            subtotal: 240.03,
          },
          {
            product: { id: 2, name: 'Apple', price: 4.01, icon: '🍎' },
            quantity: 2,
            subtotal: 8.02,
          },
          {
            product: { id: 5, name: 'Cookie', price: 4.2, icon: '🍩' },
            quantity: 4,
            subtotal: 16.8,
          },
        ],
      };
      // Act
      await page.route('/api/v1/data/random/ecommerce-shopping-cart-simple', async (route) => {
        // Collecting response
        await route.fetch();
        // Feed the UI
        await route.fulfill({ json: mockData });
      });
      await randomShoppingCartPage.navigateTo();
      // Assert
      // 1. Just because the total was verified in other tests it is not main focus of the test -
      // that is why here I added soft assertion
      await expect.soft(subtotalPriceLocator).toHaveText(expectedSubtotalPrice);
      await expect(shippingPriceLocator).toHaveText(expectedShippingPrice);
    });
    test('4. Shipping 10% of subtotal calculation - incorrect data not full object passed', async ({
      page,
    }) => {
      // Arrange
      const shippingTestId = 'shipping-cost';
      const subtotalPriceTestId = 'total-subtotal-price';
      const expectedShippingPrice = '2.65';
      const expectedSubtotalPrice = '26.82';
      const subtotalPriceLocator = page.getByTestId(subtotalPriceTestId);
      const shippingPriceLocator = page.getByTestId(shippingTestId);

      // Mock preparation
      const mockData = {
        cartItems: [
          {
            product: { id: 26, name: 'Makeup Kit', price: 80.01, icon: '💄' },
            quantity: 3,
            // subtotal: 240.03,
          },
          {
            product: { id: 2, name: 'Apple', price: 4.01, icon: '🍎' },
            quantity: 2,
            subtotal: 8.02,
          },
          {
            product: { id: 5, name: 'Cookie', price: 4.2, icon: '🍩' },
            quantity: 4,
            subtotal: 16.8,
          },
        ],
      };
      // Act
      await page.route('/api/v1/data/random/ecommerce-shopping-cart-simple', async (route) => {
        // Collecting response
        await route.fetch();
        // Feed the UI
        await route.fulfill({ json: mockData });
      });
      await randomShoppingCartPage.navigateTo();
      // Assert
      // 1. Just because the total was verified in other tests it is not main focus of the test -
      // that is why here I added soft assertion
      await expect.soft(subtotalPriceLocator).toHaveText(expectedSubtotalPrice);
      await expect(shippingPriceLocator).toHaveText(expectedShippingPrice);
    });
  });
});
