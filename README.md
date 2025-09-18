# kong-assignment
![CI](https://github.com/rusty22/kong-assignment/actions/workflows/playwright.yml/badge.svg)

Kong Take Home Assignment by Glendon Ngo.

# Toolchain
- Playwright Framework (Typescript)

# Local setup
```
npm install
```

Then run the Kong Gateway Service locally by running:
```
cd manifests && docker-compose up -d
```

# Running tests

In the top-level folder, run some of the following commands to run the tests:

Run all the end-to-end tests in headless mode:
```
  npx playwright test
```

Run all the end-to-end tests in headed mode:
```
  npx playwright test --headed
```

Run only the smoke tests:
```
  npx playwright test --grep @smoke
```

Run only the user journey tests:
```
   npx playwright test --grep @user-journey
```

Run the tests only on chrome
``` 
  npx playwright test --project=chromium
```

Runs the tests in debug mode.
```  
  npx playwright test --debug
```

Open the Playwright UI Interactive Test Runner:
```
  npx playwright test --ui
```
# CI/CD

When a commit is made to the `main` branch, a [Github Actions Pipeline](.github\workflows\playwright.yml) is ran. This includes setup/teardown of the test environment done using `docker-compose.yml` file provided in the assignment. Test run history can be viewed [here](https://github.com/rusty22/kong-assignment/actions).

# Reporting
View the HTML report after tests run (always opens after running by default):
```
 npx playwright show-report
```

You can also open the report at `playwright-report/index.html`.

# Design Considerations

I used the **page object model** pattern to model locators within the Workspace summary, Workspace overview, Gateway services, and routes pages. This helped to ensure reusable locators across several pages in the Kong Manager UI. For more complicated elements in the UI of a page, I decided to break it down further by making component classes that can be reused across pages (eg. Header and Sidebar ).

I also created `base-page.ts` which contain elements that always appear throughout the UI and all other pages can extend from the base page. These include the header and sidebar as component classes so they could be easily referenced within the base page. I also modelled table-like components such as the workspace, gateway services, and routes pages so it would reduce the amount of duplicate locators required to model these pages individually.

# Best Practices
- CI/CD pipeline runs the E2E tests on every change to main branch.
- Supports cross-browsers - Tests run on both chromium and firefox browsers
- Used built-in assertions by playwright and avoided manual assertions as much as possible.
- After the user journey test finishes, the test will attempt to delete the route and the related gateway service from the UI. This ensures that the test can be ran and pass multiple times without having to manually setup the Kong Manager UI at a known state and leave the UI in an unknown state which can cause flakiness.
- For most locators, I used `data-testid` attributes where elements were decorated with them.
- I ensured tests can be ran independently of each other.
- Sharing pages and locators where identified, made component classes for things that could be shared across pages (eg. see `table-component.ts`)
- Use BDD (Behaviour driven development) language to describe tests (Given, When, Then)
- HTML reports produced after the test run finishes to analyze and view test results easily.

# Assumptions and Tradeoffs

- The tests assume it is beginning from an empty state with zero gateway services or routes created prior.
  - I would improve this by adding a beforeAll function to clear out the database so there can be a reliable setup state.
- I would continue to map locators and write additional checks for specifying advanced details for gateway services (retries, connect time, write/read timeout, certificates etc) and routes (Https redirect status code, Regex Priority, Strip path etc.)
- If I had more time, I'd continue to generalize the empty state for pages in the sidebar. For example, the Consumers, Plugins, Redis, Upstreams, Certificates, SNIs subpages all have a very similar look in empty state.

# Additional checks

These are some additional checks I would do if I had more time:
- Check that you cannot delete a gateway service without deleting its route first
- Checking filtering behaviour
- Checking column visibility behaviour
- Checking searchbox behaviour within the tables
- Setting up further entities for testing (consumers, plugins, redis, upstreams, certs, SNIs, keys, vaults) and its details
- Checking external links go to the right URLs

# Possible Improvements
- Parallel execution
- Parameterized Tests if exercising more variations of input
- Better setup and teardown checks
- Incorporate Web Security Testing (OWASP) - eg. SQL injection
- Incorporate Fuzz testing to vary between valid/strange/bad inputs to forms.

Thank you!