import { Page } from '@playwright/test';
import { PracticePage } from './practice.page';

export class WeatherForecastPage extends PracticePage {
  url: string;
  constructor(page: Page) {
    super(page);
    this.url = 'practice/simple-weather-forecast.html';
  }
}
