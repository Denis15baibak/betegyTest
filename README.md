# betegyTest

## Installation

Install the module.

```shell
npm install
```

## Getting started

to open cypress application and run tests
```shell
npx cypress open
```

to run e2e test in chrome in headless mode
```shell
npx cypress run --spec "cypress/integration/tests/e2e.spec.js" --browser=chrome --headless
```

to run api test in chrome in headless mode
```shell
npx cypress run --spec "cypress/integration/tests/apiTests.spec.js" --browser=chrome --headless
```

to run all tests in chrome in headless mode
```shell
npx cypress run --spec "cypress/integration/tests/**/*" --browser=chrome --headless
```

to run tests in headed mode just remove --headless flag
