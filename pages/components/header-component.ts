
import { expect, type Locator, type Page } from '@playwright/test';

export class KongLandingPage {
  readonly page: Page;
  readonly title: Locator;

  // Top navigation locators
  readonly docsDropdown: Locator;
  readonly docsDropdownOptions: Locator;
  readonly infoLink: Locator;
  readonly githubStars: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('h1', { hasText: 'Installation' });
    
    // Top navigation
    this.docsDropdown = page.locator('.docs-dropdown .dropdown-trigger');
    this.docsDropdownOptions = page.locator('.docs-dropdown .dropdown-list .k-dropdown-item');
    this.infoLink = page.locator('.info-link');
    this.githubStars = page.locator('.github-star');
  }
}