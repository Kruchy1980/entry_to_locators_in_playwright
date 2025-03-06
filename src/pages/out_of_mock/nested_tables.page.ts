import { Page } from '@playwright/test';
import { PracticePage } from '@_src/pages/practice.page';

export class NestedTablesPage extends PracticePage {
  url: string;
  constructor(page: Page) {
    super(page);
    this.url = 'practice/simple-nested-table-v1.html';
  }
}
