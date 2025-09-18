import { Locator, Page } from "@playwright/test";
import { BasePage } from "./shared/base-page";
import { TableComponent } from "./components/table-component";

export class RoutesPage extends BasePage {
    
  // routes list section
  readonly routesSection: Locator;
  readonly routesListContainer: Locator;
  readonly routesCard: Locator;
  readonly tableView: Locator;

  readonly routesTable: TableComponent;
  readonly addGatewayRouteButton: Locator;

  readonly routeNameInput: Locator;
  readonly gatewayServiceDropdown: Locator;
  readonly routeTagsInput: Locator;
  readonly saveButton: Locator;
  readonly supportText: Locator;

  // Route Details
  readonly routeIdCell: Locator;
  readonly routeNameCell: Locator;
  readonly routesPathInput: Locator;
  readonly lastUpdatedDateCell: Locator;
  readonly createdDateCell: Locator;
  readonly gatewayServicesCell: Locator;
  readonly tagsCell: Locator;
  readonly protocolsBadgeCell: Locator;
  readonly pathsCell: Locator;
  readonly hostsCell: Locator;
  readonly headersCell: Locator;
  readonly methodsCell: Locator;
  readonly sourcesCell: Locator;
  readonly destinationsCell: Locator;

  constructor(page: Page) {
    super(page);
    
    // Page identifiers and main sections
    this.routesSection = page.locator('.routes-listing');
    this.supportText = page.locator('.support-text');

    // Routes list section
    this.routesTable = new TableComponent(page);
    this.addGatewayRouteButton = page.getByTestId('toolbar-add-gateway-route');
    this.saveButton = page.getByTestId('route-create-form-submit');

    // Required fields to create a routoe
    this.routeNameInput = page.getByTestId('route-form-name');
    this.gatewayServiceDropdown = page.getByTestId('route-form-service-id');
    this.routesPathInput = page.getByTestId('route-form-paths-input-1');

    // Gateway Route Details
    this.routeIdCell = page.getByTestId('id-property-value');
    this.routeNameCell = page.getByTestId('name-plain-text');
    this.lastUpdatedDateCell = page.getByTestId('updated_at-date');
    this.createdDateCell = page.getByTestId('created_at-date');
    this.gatewayServicesCell = page.getByTestId('service-property-value');
    this.tagsCell = page.getByTestId('tags-property-value');
    this.pathsCell = page.getByTestId('paths-copy-uuid-0');
    this.protocolsBadgeCell = page.getByTestId('protocols-badge-tags').locator('.k-badge');
    this.hostsCell = page.getByTestId('hosts-property-value');
    this.headersCell = page.getByTestId('headers-property-value')
    this.methodsCell = page.getByTestId('methods-property-value');
    this.sourcesCell = page.getByTestId('sources-property-value');
    this.destinationsCell = page.getByTestId('destinations-property-value');

    // Advanced section locators (future improvement)
  }

  // Navigation and page loading
  async navigate(routeName: string = 'default'): Promise<void> {
    await this.page.goto(`/${routeName}/routes`);
    await this.waitForPageLoad();
  }
}
