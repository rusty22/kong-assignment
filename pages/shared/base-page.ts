import { Locator, Page } from "@playwright/test";

export class BasePage {
    readonly page: Page;
        
    // Navigation locators
    readonly sidebar: Locator;
    readonly sidebarWorkspacesLink: Locator;
    readonly sidebarTeamsLink: Locator;
    readonly sidebarDevPortalLink: Locator;
    readonly sidebarAnalyticsLink: Locator;

    // Top navigation locators
    readonly docsDropdown: Locator;
    readonly docsDropdownOptions: Locator;
    readonly infoLink: Locator;
    readonly githubStars: Locator;
        
    // Header Locators
    readonly kongManagerLogo: Locator;
    readonly pageTitle: Locator;
    readonly newWorkspaceButton: Locator;
    
    // Footer Locators
    readonly footer: Locator;
    readonly makeAWishLink: Locator;


    constructor(page: Page) {
        this.page = page;
        
        // Navigation elements
        this.sidebar = page.locator('.kong-ui-app-sidebar');
        this.sidebarWorkspacesLink = page.getByTestId('sidebar-item-workspaces').locator('a');
        this.sidebarTeamsLink = page.getByTestId('sidebar-item-teams').locator('a');
        this.sidebarDevPortalLink = page.getByTestId('sidebar-item-dev-portal--konnect-').locator('a');
        this.sidebarAnalyticsLink = page.getByTestId('sidebar-item-analytics--konnect-').locator('a');
    
        // Top navigation
        this.docsDropdown = page.locator('.docs-dropdown .dropdown-trigger');
        this.docsDropdownOptions = page.locator('.docs-dropdown .dropdown-list .k-dropdown-item');
        this.infoLink = page.locator('.info-link');
        this.githubStars = page.locator('.github-star');

        // Header elements
        this.kongManagerLogo = page.locator('.brand-logo')
        this.pageTitle = page.locator('.workspace-overview-title');
        this.newWorkspaceButton = page.locator('.create-workspace-submit');

        // Footer
        this.footer = page.locator('footer');
        this.makeAWishLink = this.footer.locator('.make-a-wish');
    }
}