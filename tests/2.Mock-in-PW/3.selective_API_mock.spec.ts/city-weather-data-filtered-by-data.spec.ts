import { CityWeatherPage } from '@_src/pages/for_mocks/city-weather.page';
import { test, expect } from '@playwright/test';

test.describe('City weather handling', () => {
  let cityWeatherPage: CityWeatherPage;
  test.beforeEach(async ({ page }) => {
    cityWeatherPage = new CityWeatherPage(page);
    cityWeatherPage.navigateTo(); //--> Here can be used because response is received after button click used
  });

  //   test('1. Get weather data and present table to user (no mock used)', async ({ page }) => {
  //     // Arrange
  //     // for route get weather: http://localhost:3000/api/v1/data/random/weather-simple - > POST
  //     // for route get one more day past: http://localhost:3000/api/v1/data/random/weather-simple --> PUT
  //     const getWeatherButtonTestId = 'get-weather';
  //     const resultsTableTestId = 'results-table';
  //     const expectedMinResultsQuantity = 1;
  //     const getWeatherButtonLocator = page.getByTestId(getWeatherButtonTestId);
  //     const resultsTableLocator = page.getByTestId(resultsTableTestId);
  //     // Act

  //     await cityWeatherPage.navigateTo();
  //     await getWeatherButtonLocator.click();
  //     const tableResultsQuantity = await resultsTableLocator.count();
  //     // Assert
  //     expect(tableResultsQuantity).toBeGreaterThanOrEqual(expectedMinResultsQuantity);
  //   });
  test('2. Proper display of average temperature calculation (mocked)', async ({ page }) => {
    // const firstRowNumber = 0;
    // const dailyTemperatureTestId = `dti-temperature-${firstRowNumber}`;
    // const resultsTableLocator = page.getByTestId(resultsTableTestId);
    // const dailyTemperatureLocator = page.getByTestId(dailyTemperatureTestId);
    // console.log(await dailyTemperatureLocator.textContent());
    // const temperatureColumnLocator = resultsTableLocator.getByRole('row');
    // const firstRow = temperatureColumnLocator.count();
    // console.log(firstRow);
    // Arrange
    // const resultsTableTestId = 'results-table';
    // for route get weather: http://localhost:3000/api/v1/data/random/weather-simple - > POST
    // for route get one more day past: http://localhost:3000/api/v1/data/random/weather-simple --> PUT
    const getWeatherButtonTestId = 'get-weather';
    const meanTemperatureTestId = 'dti-meanTemperature';
    const expectedMeanTemperature = '22.00';
    const getWeatherButtonLocator = page.getByTestId(getWeatherButtonTestId);
    const meanTemperatureLocator = page.getByTestId(meanTemperatureTestId);
    // Act

    await page.route('api/v1/data/random/weather-simple', async (route) => {
      // const response = await route.fetch(); // If we do not want to verify Response here we do not need to fetch the data
      // const responseJson = await response.json(); // Only for info
      // console.log(responseJson); // Only for info display
      // // Feeding our response with proper data
      await route.fulfill({ json: mockedWeatherApiBaseResponse });
    });

    await getWeatherButtonLocator.click();

    // console.log(temperatureColumnLocator);
    // Assert
    await expect(meanTemperatureLocator).toHaveText(expectedMeanTemperature);
  });
  test('3. Mock responses for weather with 404', async ({ page }) => {
    // Arrange
    // for route get weather: http://localhost:3000/api/v1/data/random/weather-simple - > POST
    // for route get one more day past: http://localhost:3000/api/v1/data/random/weather-simple --> PUT
    const getWeatherButtonTestId = 'get-weather';
    const alertTestId = 'dti-simple-alert-with-custom-message';
    const expectedErrorMessage = 'The page you are looking for does not exist';
    const errorMessageTestId = 'error-message';
    const resultsTableTestId = 'results-table';
    const errorMessageText = 'Please check the URL and try again';
    const resultsTableLocator = page.getByTestId(resultsTableTestId);
    const getWeatherButtonLocator = page.getByTestId(getWeatherButtonTestId);
    const alertLocator = page.getByTestId(alertTestId);
    const errorMessageLocator = page.getByTestId(errorMessageTestId);
    // Act
    // Set the mocking mechanism dependent of method
    await page.route('api/v1/data/random/weather-simple', async (route) => {
      await route.fulfill({ status: 404, body: 'Not Found !' });
    });

    await getWeatherButtonLocator.click();

    // console.log(temperatureColumnLocator);
    // Assert
    await expect.soft(resultsTableLocator).toBeHidden();
    expect.soft(await alertLocator.innerText()).toContain(expectedErrorMessage);
    await expect.soft(errorMessageLocator).toBeVisible();
    await expect(errorMessageLocator).toHaveText(errorMessageText);
  });
  test('4. Mock responses for Warsaw in request', async ({ page }) => {
    // Arrange
    // for route get weather: http://localhost:3000/api/v1/data/random/weather-simple - > POST
    // for route get one more day past: http://localhost:3000/api/v1/data/random/weather-simple --> PUT
    const getWeatherButtonTestId = 'get-weather';
    const alertTestId = 'dti-simple-alert-with-custom-message';
    const expectedErrorMessage = 'The page you are looking for does not exist';
    const errorMessageTestId = 'error-message';
    const resultsTableTestId = 'results-table';
    const errorMessageText = 'Please check the URL and try again';
    const citiesListTestId = 'city';
    const resultsTableLocator = page.getByTestId(resultsTableTestId);
    const getWeatherButtonLocator = page.getByTestId(getWeatherButtonTestId);
    const alertLocator = page.getByTestId(alertTestId);
    const errorMessageLocator = page.getByTestId(errorMessageTestId);
    const citiesListLocator = page.getByTestId(citiesListTestId);
    // Act
    // Set the mocking mechanism dependent of payload for backend
    await page.route('api/v1/data/random/weather-simple', async (route) => {
      // Condition for warsaw only
      if (route.request().postData()?.includes('Warsaw')) {
        // When object with city: Warsaw is in payload than we want to set statusCode 404 for it
        await route.fulfill({ status: 404, body: 'Not Found !' });
      } else {
        // Pass the request without changes to backend
        await route.continue();
      }
    });

    await getWeatherButtonLocator.click();

    // console.log(temperatureColumnLocator);
    // Assert
    await expect.soft(resultsTableLocator).toBeHidden();
    expect.soft(await alertLocator.innerText()).toContain(expectedErrorMessage);
    await expect.soft(errorMessageLocator).toBeVisible();
    await expect(errorMessageLocator).toHaveText(errorMessageText);
    // Another assertion - fo positive path for city different than Warsaw
    await citiesListLocator.selectOption({ value: 'Berlin' });

    await getWeatherButtonLocator.click();

    // Assert
    await expect.soft(resultsTableLocator).toBeVisible();
    await expect(alertLocator).toBeHidden();
    await expect.soft(errorMessageLocator).toBeHidden();
    await expect(errorMessageLocator).toBeHidden();
  });
  test('5. Mock responses for statusCode equal 200', async ({ page }) => {
    // Arrange
    // for route get weather: http://localhost:3000/api/v1/data/random/weather-simple - > POST
    // for route get one more day past: http://localhost:3000/api/v1/data/random/weather-simple --> PUT
    const getWeatherButtonTestId = 'get-weather';
    const errorMessageTestId = 'error-message';
    const resultsTableTestId = 'results-table';
    const errorMessageText = 'Please check the URL and try again';
    const citiesListTestId = 'city';
    const resultsTableLocator = page.getByTestId(resultsTableTestId);
    const getWeatherButtonLocator = page.getByTestId(getWeatherButtonTestId);
    const errorMessageLocator = page.getByTestId(errorMessageTestId);
    const citiesListLocator = page.getByTestId(citiesListTestId);
    // Act
    // Set the mocking mechanism dependent of payload for backend
    await page.route('api/v1/data/random/weather-simple', async (route) => {
      // Reading status code - response is needed to read the response statusCode
      const response = await route.fetch();
      if (response.status() === 200) {
        // When object with city: Warsaw is in payload than we want to set statusCode 404 for it
        await route.fulfill({ status: 404, body: 'Not Found !' });
      } else {
        // Pass the request without changes to backend
        await route.continue();
      }
    });

    await getWeatherButtonLocator.click();

    // Assert
    await expect.soft(resultsTableLocator).toBeHidden();
    await expect.soft(errorMessageLocator).toBeVisible();
    await expect(errorMessageLocator).toHaveText(errorMessageText);

    // Both assertions are failed
    await citiesListLocator.selectOption({ value: 'Berlin' });

    await getWeatherButtonLocator.click();

    // Assert
    await expect.soft(resultsTableLocator).toBeHidden();
    await expect.soft(errorMessageLocator).toBeVisible();
    await expect(errorMessageLocator).toHaveText(errorMessageText);
  });
});
// Below all of the tests we can prepare object which can be later injected in response
const mockedWeatherApiBaseResponse = [
  {
    date: '2025-03-04',
    city: 'Warsaw',
    temperature: 22,
    temperatureMin: 13,
    temperatureMax: 29,
    humidity: '54%',
    dayLength: 19,
    windSpeed: 3,
    windSpeedRange: '0-5 km/h',
  },
  {
    date: '2025-03-03',
    city: 'Warsaw',
    temperature: 20,
    temperatureMin: 17,
    temperatureMax: 25,
    humidity: '53%',
    dayLength: 17,
    windSpeed: 1,
    windSpeedRange: '0-5 km/h',
  },
  {
    date: '2025-03-02',
    city: 'Warsaw',
    temperature: 24,
    temperatureMin: 17,
    temperatureMax: 24,
    humidity: '50%',
    dayLength: 17,
    windSpeed: 4,
    windSpeedRange: '0-5 km/h',
  },
];

// const mockedWeatherApiPastDayResponse = [
//   {
//     date: '2025-03-01',
//     city: 'Warsaw',
//     temperature: 28,
//     temperatureMin: 13,
//     temperatureMax: 29,
//     humidity: '54%',
//     dayLength: 19,
//     windSpeed: 3,
//     windSpeedRange: '0-5 km/h',
//   },
// ];
