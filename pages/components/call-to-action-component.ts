
import { expect, type Locator, type Page } from '@playwright/test';

export class KongCallToActionComponent {
  readonly page: Page;

  // Konnect CTA section
  readonly konnectCtaCard: Locator;
  readonly konnectLogo: Locator;
  readonly konnectTitle: Locator;
  readonly konnectDescription: Locator;
  readonly konnectFeaturesList: Locator;
  readonly konnectFeatureItems: Locator;
  readonly konnectGetStartedButton: Locator;
  readonly konnectFooterDescription: Locator;
  readonly konnectPreviewScreenshot: Locator;

  constructor(page: Page) {
    this.page = page;

    this.konnectCtaCard = page.locator('.konnect-cta-container');
    this.konnectLogo = this.konnectCtaCard.locator('.konnect-logo');
    this.konnectTitle = this.konnectCtaCard.locator('.konnect-cta-title');
    this.konnectDescription = this.konnectCtaCard.locator('.konnect-cta-description');
    this.konnectFeaturesList = this.konnectCtaCard.locator('.konnect-cta-list');
    this.konnectFeatureItems = this.konnectFeaturesList.locator('.konnect-cta-item');
    this.konnectGetStartedButton = this.konnectCtaCard.locator('.konnect-cta-footer .k-button');
    this.konnectFooterDescription = this.konnectCtaCard.locator('.konnect-cta-footer-description');
    this.konnectPreviewScreenshot = this.konnectCtaCard.locator('.konnect-preview-screenshot')
  }

}