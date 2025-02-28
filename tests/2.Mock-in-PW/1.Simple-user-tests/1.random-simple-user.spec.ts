// import { SimpleUserPage } from '@_src/pages/for_mocks/simple-user.page';
import { SimpleUserPage } from '@_src/pages/for_mocks/simple-user.page';
import { test, expect } from '@playwright/test';

test.describe('User data tests - mock', () => {
  // The below use is not useful for API mocking
  let simpleUserPage: SimpleUserPage;
  test.beforeAll('Navigate to proper page', async ({ page }) => {
    // BeforeAll is used because no action performed except variable preparation
    simpleUserPage = new SimpleUserPage(page);
    //   await simpleUserPage.navigateTo();
  });
  test('1. Verify user name visibility', async ({ page }) => {
    // Arrange"
    const userNameTestId = 'user-full-name';
    const userNameLocator = page.getByTestId(userNameTestId);
    // How to intercept backend ressponse - route method for being use
    await page.route('/api/v1/data/random/simple-user', async (route) => {
      // Collect response
      const response = await route.fetch();
      // Change response to JSON file
      const json = await response.json();
      // eslint-disable-next-line no-console
      console.log(json);
      // Pass the response to the web
      await route.fulfill({ json: json }); // Without that step browser won't display the result
    });
    // Act
    await page.goto('practice/random-simple-user-v1.html');
    // Assert
    await expect(userNameLocator).toBeVisible();
    const userName = await userNameLocator.innerText();
    // eslint-disable-next-line no-console
    console.log(userName);
  });
  test('2. Inject full object with changed user name', async ({ page }) => {
    // Arrange"
    const userNameTestId = 'user-full-name';
    const userNameLocator = page.getByTestId(userNameTestId);
    // Create value we want to paste to the response
    const expectedUserName = 'Johny Bravo';
    // How to intercept backend response - route method for being use
    // Preparation of data which should be filled on the page - full object should be inserted in that test
    const mockedUserData = {
      userId: 'U8428',
      username: 'yingstewart889',
      firstName: 'Johny',
      lastName: 'Bravo',
      email: 'yingstewart889@test2.test.com',
      phone: '+845-777-372-5924',
      dateOfBirth: '1984-04-24T22:00:00.000Z',
      profilePicture: '1bd4391b-e7a0-49ed-8fb8-38fc73f76fa3.jpg',
      address: {
        street: '182 Pine Street',
        city: 'Belle Reve',
        postalCode: 48594,
        country: 'Australia',
      },
      lastLogin: '2020-12-25T23:00:00.000Z',
      accountCreated: '2021-06-30T22:00:00.000Z',
      status: 4,
    };
    await page.route('/api/v1/data/random/simple-user', async (route) => {
      // Collect response
      const response = await route.fetch();
      // Change response to JSON file
      const json = await response.json();
      // eslint-disable-next-line no-console
      console.log(json);
      // Pass the response to the web - here we can also inject our created data
      await route.fulfill({ json: mockedUserData }); // Without that step browser won't display the result
    });
    // Act
    // await page.goto('practice/random-simple-user-v1.html');
    await simpleUserPage.navigateTo();
    // Assert
    await expect(userNameLocator).toHaveText(expectedUserName);
  });
  test('3. Missing birthsDate', async ({ page }) => {
    // Arrange"
    const birthdateTestId = 'user-date-of-birth';
    const birthdateLocator = page.getByTestId(birthdateTestId);
    // Create value we want to paste to the response
    const expectedBirthdate = 'Invalid Date';
    // How to intercept backend response - route method for being use
    await page.route('/api/v1/data/random/simple-user', async (route) => {
      // Collect response
      const response = await route.fetch();
      // Change response to JSON file
      const json = await response.json();
      // eslint-disable-next-line no-console
      console.log(json);
      // Modify birthdAte value
      json.dateOfBirth = '';
      // Pass the response to the web - here we can also inject our created data
      await route.fulfill({ json: json }); // Without that step browser won't display the result
    });
    // Act
    // await page.goto('practice/random-simple-user-v1.html');
    await simpleUserPage.navigateTo();
    // Assert
    await expect(birthdateLocator).toHaveText(expectedBirthdate);
  });
  test('3. BirthDate over 100 Years', async ({ page }) => {
    // Arrange"
    const ageTestId = 'user-age';
    const ageLocator = page.getByTestId(ageTestId);
    // Create value we want to paste to the response
    const expectedAge = '101';
    const birthDate = '1924-02-28T23:00:00.000Z';
    // How to intercept backend response - route method for being use
    await page.route('/api/v1/data/random/simple-user', async (route) => {
      // Collect response
      const response = await route.fetch();
      // Change response to JSON file
      const json = await response.json();
      // eslint-disable-next-line no-console
      console.log(json);
      // Modify birthdAte value
      json.dateOfBirth = birthDate;
      // Pass the response to the web - here we can also inject our created data
      await route.fulfill({ json: json }); // Without that step browser won't display the result
    });
    // Act
    // await page.goto('practice/random-simple-user-v1.html');
    await simpleUserPage.navigateTo();
    // Assert
    // await expect(ageLocator).toHaveText(expectedAge);
    await expect(ageLocator).not.toHaveText(expectedAge);
  });
});
