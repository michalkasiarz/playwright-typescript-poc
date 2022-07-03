# playwright-poc

:hotsprings: Language: TypeScript  
:heavy_check_mark: Frameworks: Playwright  
:books: Dependencies: Prettier

# General Description

Test core repo created to demonstrate the usage of Playwright in action along with TypeScript.

# Installation

1. Clone the repo

SSH: `git@github.com:michalkasiarz/playwright-poc.git`  
HTTP: `https://github.com/michalkasiarz/playwright-poc.git`  
Github CLI: `gh repo clone michalkasiarz/playwright-poc`

2. Install NodeJS and NPM
3. Do a `npm install` in the project root

# Running the tests

There are two test suites. One for :link: [ZeroWebApp](http://zero.webappsecurity.com), and the other one for :link: [ExampleApp](https://example.com/). To run specific suites use tags:

`@regressionZeroWebApp` to run the test for the ZeroWebApp and

`@regressionExample` for ExampleApp, respectively.

`@regression` tag can be used for running the full regression set.

All tests are set to run concurrently by default. If there would be any test failures, you can find test run artifacts (videos and screenshots) in the `test-results` catalog. Also, after running the regression set, an HTML test report is generated that will look like this:

![alt text](test-results.png)

The report itself will be placed in the `playwright-report` catalog. In order to display the report after the local execution you may need to use `npx playwright show-report` command.

Also, there are additional node scripts prepared for testing with a specific browser.

`npm run test:chrome` to run test against Chrome browser,  
`npm run test:firefox` to run tests again Firefox and  
`npm run test:webkit` for Webkit, which is a Safari engine.

# Playwright Inspector

Playwright provides its own debugger called Playwright Inspector that may be run upon the test execution. In order to use it, add `await page.pause` line at which you want the application to stop. Remember to remove that line after the debugging session!
