import { Page } from '@playwright/test';
import { PracticePage } from './practice.page';

export class ReservationPage extends PracticePage {
  url: string;
  constructor(page: Page) {
    super(page);
    this.url = 'practice/simple-reservation-v1.html';
  }
}
