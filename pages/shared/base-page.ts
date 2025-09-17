import { Locator, Page } from "@playwright/test";
import { KongSideBarComponent } from "../components/kong-sidebar-component";
import { KongHeaderComponent } from "../components/header-component";

export class BasePage {
    readonly page: Page;
    readonly title: Locator;
        
    // Sidebar Navigation Component
    readonly kongHeader: KongHeaderComponent;
    readonly kongSideNavBar: KongSideBarComponent;

    // Header Locators
    readonly kongManagerLogo: Locator;
    readonly newWorkspaceButton: Locator;

    // Miscellaneous and notifications locators
    readonly makeAWishLink: Locator;
    readonly statusMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.title = page.locator('h3');

        this.kongHeader = new KongHeaderComponent(page);
        this.kongSideNavBar = new KongSideBarComponent(page);
        this.makeAWishLink = page.locator('.make-a-wish');
        this.statusMessage = page.locator('.toaster-message');
    }

    async waitForPageLoad(): Promise<void> {
        await this.page.waitForLoadState('networkidle');
    }
}