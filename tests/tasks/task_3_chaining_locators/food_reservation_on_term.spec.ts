/* eslint-disable playwright/no-conditional-in-test */
import { ReservationPage } from '@_src/pages/reservation.page';
import { test, expect } from '@playwright/test';

test.describe('Food reservation tests', () => {
  let reservationPage: ReservationPage;
  test.beforeEach('Navigate to reservation page', async ({ page }) => {
    reservationPage = new ReservationPage(page);
    await reservationPage.navigateTo();
  });
  test('Reserve food for specified term - simple', async ({ page }) => {
    //Arrange
    // Selectors
    const reservationCheckboxSelector = 'checkbox';
    const buttonsRoleSelector = 'button';
    const confirmButtonText = 'Checkout';
    const resultsTestId = 'dti-results';

    const parentRow = 'row';
    const parentOrderText = 'Food';
    const parentDateText = '24.10.2024';
    // Expected Result
    const expectedMessage = `Reservation for ${parentDateText} with features: Food for total price: 150$`;
    // Locators
    const orderCheckboxLocator = page
      .getByRole(parentRow)
      .filter({ has: page.getByText(parentOrderText) })
      .getByRole(reservationCheckboxSelector);

    const reservationDateButtonLocator = page
      .getByRole(parentRow)
      .filter({ has: page.getByText(parentDateText) })
      .getByRole(buttonsRoleSelector);

    const checkoutButtonLocator = page
      .getByRole(buttonsRoleSelector)
      .filter({ hasText: confirmButtonText });

    const resultLocator = page.getByTestId(resultsTestId);
    //Act
    await orderCheckboxLocator.check();
    await reservationDateButtonLocator.click();
    await checkoutButtonLocator.click();
    //Assert
    await expect(resultLocator).toHaveText(expectedMessage);
  });

  test('Reserve food for specified term - fully automated - TODO:', async ({ page }) => {
    //   //Arrange
    //   // Selectors
    const reservationCheckboxSelector = 'checkbox';
    const buttonsRoleSelector = 'button';
    const confirmButtonText = 'Checkout';
    const resultsTestId = 'dti-results';

    const parentRow = 'row';
    const parentOrderText = 'Pool';
    const parentDateText = '25.10.2024';

    function priceCalculation(parentOrderText: string, parentDateText: string): number {
      let price_1 = 0;
      let price_2 = 0;
      if (parentOrderText === 'Food') price_1 = 50;
      if (parentOrderText === 'Pool') price_1 = 40;
      if (parentOrderText === 'WiFi') price_1 = 20;
      if (parentOrderText === 'Parking') price_1 = 20;
      if (parentOrderText === 'Gym') price_1 = 25;
      if (parentOrderText === 'Spa') price_1 = 44;

      if (parentDateText === '22.10.2024') price_2 = 90;
      if (parentDateText === '23.10.2024') price_2 = 100;
      if (parentDateText === '24.10.2024') price_2 = 100;
      if (parentDateText === '25.10.2024') price_2 = 200;
      // console.log(price_1);
      // console.log(price_2);
      const result = price_1 + price_2;
      return result;
    }
    const finalPrice = priceCalculation(parentOrderText, parentDateText);
    // console.log('My Present result: ', finalPrice);
    // Expected Result
    const expectedMessage = `Reservation for ${parentDateText} with features: ${parentOrderText} for total price: ${finalPrice}$`;
    // Locators
    const orderCheckboxLocator = page
      .getByRole(parentRow)
      .filter({ has: page.getByText(parentOrderText) })
      .getByRole(reservationCheckboxSelector);

    const reservationDateButtonLocator = page
      .getByRole(parentRow)
      .filter({ has: page.getByText(parentDateText) })
      .getByRole(buttonsRoleSelector);

    const checkoutButtonLocator = page
      .getByRole(buttonsRoleSelector)
      .filter({ hasText: confirmButtonText });

    const resultLocator = page.getByTestId(resultsTestId);
    //Act
    await orderCheckboxLocator.check();
    await reservationDateButtonLocator.click();
    await checkoutButtonLocator.click();
    //Assert
    await expect(resultLocator).toHaveText(expectedMessage);
  });
});
