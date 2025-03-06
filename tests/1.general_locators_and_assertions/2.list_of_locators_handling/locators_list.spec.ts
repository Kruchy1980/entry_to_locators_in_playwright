import { SimpleMultipleElementsPage } from '@_src/pages/out_of_mock/simple-multiple-elements.page';
import { test, expect } from '@playwright/test';

test.describe('List of locators handling', () => {
  let simpleMultipleElementsPage: SimpleMultipleElementsPage;
  test.beforeEach('Navigate to proper page', async ({ page }) => {
    simpleMultipleElementsPage = new SimpleMultipleElementsPage(page);
    await simpleMultipleElementsPage.navigateTo();
  });
  test('1. All buttons on page', async ({ page }) => {
    // Arrange
    const allButtonsClass = 'button';
    const allButtonsLocator = page.getByRole(allButtonsClass);
    const expectedQuantityOfElements = 7;

    // Act
    await allButtonsLocator.count();
    // console.log(await allButtonsLocator.count());
    // Assert
    // const quantityOfButtons = await allButtonsLocator.count();
    await expect(allButtonsLocator).toHaveCount(expectedQuantityOfElements);
  });
  // test.skip('1.1 All buttons on page - should fail on action', async ({ page }) => {
  //   // Arrange:
  //   const elementRole = 'button';
  //   // we can define the locator for the element
  //   const buttonLocator = page.getByRole(elementRole);
  //   // print the count of buttons on the page
  //   console.log('number of button elements:', await buttonLocator.count());
  //   // Assert:
  //   // check if number of buttons is 7
  //   await expect(buttonLocator).toHaveCount(7);
  //   // ❌ because there are multiple buttons on the page
  //   // ❌ following line will return an error:
  //   await buttonLocator.click();
  //   // ❌ with following error on console:
  //   // Error: locator.click: Error: strict mode violation: getByRole('button') resolved to 7 elements:
  //   // 1) <button id="btnPractice" class="button-primary" data-testid="open-practice">Main Practice Page</button> aka getByTestId('open-practice')
  //   // 2) <button class="my-button" onclick="buttonOnClick()">Click me!</button> aka getByRole('button', { name: 'Click me!' })
  //   // 3) <button class="my-button" onclick="buttonOnClick('(Second one!)')">Click me too!</button> aka getByRole('button', { name: 'Click me too!' })
  //   // 4) <button class="my-button" onclick="buttonOnClick('(Third one!)')">Click here!</button> aka getByRole('button', { name: 'Click here!' })
  //   // 5) <button class="my-button" onclick="buttonOnClick('(row 1)')">Click!</button> aka getByRole('row', { name: 'Row 1 X Click!' }).getByRole('button')
  //   // 6) <button class="my-button" onclick="buttonOnClick('(row 2)')">Click!</button> aka getByRole('row', { name: 'Row 2 Y Click!' }).getByRole('button')
  //   // 7) <button class="my-button" onclick="buttonOnClick('(row 3)')">Click!</button> aka getByRole('row', { name: 'Row 3 Z Click!' }).getByRole('button')
  //   // // Arrange
  //   // const resultTestId = 'dti-results';
  //   // // const secondInRowResult = 'You clicked the button! (Second one!)';
  //   // const elementRole = "button";
  //   // const elementText = "Click me too!";

  //   // const buttonLocator = page.getByRole(elementRole, { name: elementText });
  //   // const resultsLocator = page.getByTestId(resultTestId);

  //   // // Act
  //   // // await allButtonsLocator.count();
  //   // // await allButtonsLocator.nth(2).click();
  //   // // console.log(await allButtonsLocator.click());
  //   // await buttonLocator.click();
  //   // console.log(await resultsLocator.textContent());
  //   // // console.log((allButtonsLocator.nth(2)).click());
  //   // // console.log('text Content result: ', await resultsLocator.textContent());
  //   // // Assert
  //   // // const quantityOfButtons = await allButtonsLocator.count();
  //   // // await expect(allButtonsLocator).toHaveCount(expectedQuantityOfElements);
  //   // // await expect(resultsLocator.innerText()).toContain(secondInRowResult);
  //   // Arrange:
  //   // const elementRole = 'button';
  //   // const resultsTestId = 'dti-results';
  //   // const expectedMessage = 'You clicked the button! (Second one!)';
  //   // const buttonLocator = page.getByRole(elementRole);
  //   // const resultsLocator = page.getByTestId(resultsTestId);
  //   // // print the count of buttons on the page
  //   // console.log('number of button elements:', await buttonLocator.count());
  //   // // Act:
  //   // // click on the 3rd button (we count from 0)
  //   // await buttonLocator.nth(2).click();
  //   // // display the text content of the results element
  //   // // console.log("results text content:", await resultsLocator.textContent());
  //   // // Assert:
  //   // await expect(resultsLocator).toHaveText(expectedMessage);
  // });
  test('2. Action on nth button', async ({ page }) => {
    // Arrange
    const elementsRole = 'button';
    const resultTestId = 'dti-results';
    const expectedMessage = 'You clicked the button! (Second one!)';
    // const expectedQuantityOfElements = 7;
    const buttonsLocator = page.getByRole(elementsRole);
    const resultsLocator = page.getByTestId(resultTestId);

    // Solution I - when only one action performed on element through all of the tests
    // Act
    // await buttonsLocator.nth(2).click();

    // // Assert
    // await expect(resultsLocator).toHaveText(expectedMessage);

    // Act Solution 2 - when more actions are planned to perform on execution per element
    const singleButtonLocator = buttonsLocator.nth(2);
    await singleButtonLocator.click();
    // console.log(await resultsLocator.textContent());

    // Assert
    // const quantityOfButtons = await allButtonsLocator.count();
    // await expect(allButtonsLocator).toHaveCount(expectedQuantityOfElements);
    await expect(resultsLocator).toHaveText(expectedMessage);
  });
  test('3. Action on multiple buttons', async ({ page }) => {
    // Arrange
    const elementRole = 'button';
    const elementText = 'Click!';
    const resultTestId = 'dti-results';

    const buttonLocator = page.getByRole(elementRole, { name: elementText });
    const resultsLocator = page.getByTestId(resultTestId);
    // Act
    const numberOfElements = await buttonLocator.count();

    // Assert
    for (let i = 0; i < numberOfElements; i++) {
      await buttonLocator.nth(i).click();
      await expect(resultsLocator).toHaveText(`You clicked the button! (row ${i + 1})`);
    }
  });
});
