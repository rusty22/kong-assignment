# kong-assignment
![CI](https://github.com/glendonngo/kong-assignment/actions/workflows/playwright.yml/badge.svg)

Kong Take Home Assignment by Glendon Ngo.

# Toolchain
- Playwright Framework (Typescript)

# Local setup
```
npm install
```

# Running tests

In the top-level folder, run some of the following commands to run the tests:

Run the tests in `kong-gateway-tests.spec.ts`:
```
  npx playwright test kong-gateway-tests.spec.ts
```

Run all the end-to-end tests.
```
  npx playwright test
```

Run the tests only on chrome
``` 
  npx playwright test --project=chromium
```

Runs the tests in debug mode.
```  
  npx playwright test --debug
```

Opens the Playwright UI Interactive Test Runner:
```
  npx playwright test --ui
```

