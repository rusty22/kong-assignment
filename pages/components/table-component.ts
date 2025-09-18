
import { type Locator, type Page } from '@playwright/test';

export class TableComponent {
  readonly page: Page;

  // Table toolbar elements
  readonly filterButton: Locator;
  readonly columnVisibilityButton: Locator;
  
    // Table elements
  private readonly tableToolbar: Locator;
  private readonly tableContainer: Locator;
  private readonly table: Locator;
  readonly tableBody: Locator;
  readonly tableHeaders: Locator;
  readonly tableRows: Locator;
  readonly tableColumns: Locator;

  // Empty state elements
  readonly emptyTableState: Locator;
  readonly emptyTableStateIcon: Locator;
  readonly emptyTableStateTitle: Locator;
  readonly emptyTableStateMessage: Locator;
  readonly genericEmptyStateActionButton: Locator;


  constructor(page: Page) {
    this.page = page;

    // Table toolbar elements (if present) - some tables don't have these elements
    this.filterButton = page.getByTestId('filter-button');
    this.columnVisibilityButton = page.getByTestId('column-visibility-menu-button');
    
    // Table elements
    this.tableContainer = page.locator('.table-container');
    this.table = this.tableContainer.getByRole('table');
    this.tableToolbar = this.table.locator('.table-toolbar');
    this.tableHeaders = this.table.locator('thead th');
    this.tableBody = this.table.locator('tbody');
    this.tableRows = this.tableBody.locator('tr');
    this.tableColumns = this.tableBody.locator('td');

    // Empty state elements
    this.emptyTableState = page.getByTestId('table-empty-state');
    this.emptyTableStateIcon = this.emptyTableState.locator('.empty-state-icon .kui-icon');
    this.emptyTableStateTitle = this.emptyTableState.locator('.empty-state-title');
    this.emptyTableStateMessage = this.emptyTableState.locator('.empty-state-message');
    this.genericEmptyStateActionButton = this.emptyTableState.getByTestId('empty-state-action');
  }
}