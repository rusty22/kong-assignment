import { Locator, Page } from "@playwright/test";

export class BasePage {
    readonly page: Page;
    readonly title: Locator;
        
    // Navigation locators
    readonly sidebar: Locator;
    readonly sidebarWorkspacesLink: Locator;
    readonly sidebarTeamsLink: Locator;
    readonly sidebarDevPortalLink: Locator;
    readonly sidebarAnalyticsLink: Locator;

    // Header Locators
    readonly kongManagerLogo: Locator;
    readonly newWorkspaceButton: Locator;
    
    readonly makeAWishLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.title = page.locator('h3');
        
        // Navigation elements
        this.sidebar = page.locator('.kong-ui-app-sidebar');
        this.sidebarWorkspacesLink = page.getByTestId('sidebar-item-workspaces').locator('a');
        this.sidebarTeamsLink = page.getByTestId('sidebar-item-teams').locator('a');
        this.sidebarDevPortalLink = page.getByTestId('sidebar-item-dev-portal--konnect-').locator('a');
        this.sidebarAnalyticsLink = page.getByTestId('sidebar-item-analytics--konnect-').locator('a');

        // Header elements
        this.kongManagerLogo = page.locator('.brand-logo')
        this.newWorkspaceButton = page.locator('.create-workspace-submit');

        this.makeAWishLink = page.locator('.make-a-wish');
    }
}