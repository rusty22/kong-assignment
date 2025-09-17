import { Page, Locator } from '@playwright/test';

export class KongSideBarComponent {
  readonly page: Page;
  
  // Main sidebar container
  readonly sidebar: Locator;
  readonly sidebarHeader: Locator;
  readonly brandLogo: Locator;
  readonly sidebarContent: Locator;
  readonly mainMenu: Locator;
  readonly sidebarFooter: Locator;

  // Primary navigation items
  readonly workspacesItem: Locator;
  readonly workspacesIcon: Locator;
  readonly workspacesName: Locator;
  readonly workspacesLabel: Locator;
  
  readonly teamsItem: Locator;
  readonly teamsIcon: Locator;
  
  readonly devPortalItem: Locator;
  readonly devPortalIcon: Locator;
  
  readonly analyticsItem: Locator;
  readonly analyticsIcon: Locator;

  // Workspace submenu (secondary navigation)
  readonly workspaceSubmenu: Locator;
  readonly overviewMenuItem: Locator;
  readonly gatewayServicesMenuItem: Locator;
  readonly routesMenuItem: Locator;
  readonly consumersMenuItem: Locator;
  readonly pluginsMenuItem: Locator;
  readonly redisConfigurationsMenuItem: Locator;
  readonly upstreamsMenuItem: Locator;
  readonly certificatesMenuItem: Locator;
  readonly snisMenuItem: Locator;
  readonly keysMenuItem: Locator;
  readonly vaultsMenuItem: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Main sidebar container
    this.sidebar = page.locator('.kong-ui-app-sidebar');
    this.sidebarHeader = this.sidebar.locator('.sidebar-header');
    this.sidebarContent = this.sidebar.locator('.sidebar-content-container');

    this.workspacesItem = page.getByTestId('sidebar-item-workspaces');
    this.workspacesIcon = this.workspacesItem.locator('.sidebar-item-icon .kui-icon');
    this.workspacesName = this.workspacesItem.locator('.sidebar-item-name');
    this.workspacesLabel = this.workspacesItem.locator('.sidebar-item-label');
    
    this.teamsItem = page.getByTestId('sidebar-item-teams');
    this.teamsIcon = this.teamsItem.locator('.sidebar-item-icon .kui-icon');
    
    this.devPortalItem = page.getByTestId('sidebar-item-dev-portal--konnect-');
    this.devPortalIcon = this.devPortalItem.locator('.sidebar-item-icon .kui-icon');
    
    this.analyticsItem = page.getByTestId('sidebar-item-analytics--konnect-');
    this.analyticsIcon = this.analyticsItem.locator('.sidebar-item-icon .kui-icon');

    // Workspace submenu options
    this.workspaceSubmenu = this.workspacesItem.locator('#subnav-workspace');
    this.overviewMenuItem = page.getByTestId('sidebar-item-overview');
    this.gatewayServicesMenuItem = page.getByTestId('sidebar-item-gateway-services');
    this.routesMenuItem = page.getByTestId('sidebar-item-routes');
    this.consumersMenuItem = page.getByTestId('sidebar-item-consumers');
    this.pluginsMenuItem = page.getByTestId('sidebar-item-plugins');
    this.redisConfigurationsMenuItem = page.getByTestId('sidebar-item-redis-configurations');
    this.upstreamsMenuItem = page.getByTestId('sidebar-item-upstreams');
    this.certificatesMenuItem = page.getByTestId('sidebar-item-certificates');
    this.snisMenuItem = page.getByTestId('sidebar-item-snis');
    this.keysMenuItem = page.getByTestId('sidebar-item-keys');
    this.vaultsMenuItem = page.getByTestId('sidebar-item-vaults');
  }
}