import { Locator, Page } from "@playwright/test";
import { KongSideBarComponent } from "../components/kong-sidebar-component";
import { KongHeaderComponent } from "../components/header-component";

export class BasePage {
    readonly page: Page;
    readonly title: Locator;
        
    // Header Component
    readonly kongHeader: KongHeaderComponent;
    // Sidebar Navigation Component
    readonly kongSideNavBar: KongSideBarComponent;

    // Miscellaneous and notifications locators
    readonly makeAWishLink: Locator;
    readonly statusMessage: Locator;

    // Delete confirmation window for cleanup - improvement: can be a separate component
    readonly moreActionsButton: Locator;
    readonly deleteActionButton: Locator;
    readonly deleteConfirmationInput: Locator;
    readonly deleteConfirmationButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.title = page.locator('h3');

        this.kongHeader = new KongHeaderComponent(page);
        this.kongSideNavBar = new KongSideBarComponent(page);
        this.makeAWishLink = page.locator('.make-a-wish');
        this.statusMessage = page.locator('.toaster-message');

        this.moreActionsButton = page.getByTestId('row-actions-dropdown-trigger')
        this.deleteActionButton = page.getByTestId('action-entity-delete');
        this.deleteConfirmationInput = page.getByTestId('confirmation-input');
        this.deleteConfirmationButton = page.getByTestId('modal-action-button');
    }

    async waitForPageLoad(): Promise<void> {
        await this.page.waitForLoadState('networkidle');
    }
}