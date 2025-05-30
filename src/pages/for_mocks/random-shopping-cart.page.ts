import { Page } from '@playwright/test';
import { PracticePage } from '@_src/pages/practice.page';

export class RandomShoppingCartPage extends PracticePage {
  url: string;
  constructor(page: Page) {
    super(page);
    this.url = '/practice/random-shopping-cart-v1.html';
  }
}
