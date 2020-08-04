# invoice

This project create a simple multi-currency invoicing CLI tool which uses the
ExchangeRatesAPI.io historical data API. The program read in a JSON file at a path specified relevant to the location of the `run.sh` script.

Example JSON input:

```
{"invoice":{"currency":"NZD","date":"2020-07-07","lines":[{"description":"Intel
Core i9","currency":"USD","amount":700},{"description":"ASUS ROG
Strix","currency":"AUD","amount":500}]}}
```

The application uses the following technologies:

- Backend: NodeJs
- Type Checking: Typescript

## Scripts

```
- test.sh                  - will run all the tests
- npm run coverage         - will generate code coverage reports
- build.sh                 - will generate generate .js from the .ts files for production use
- install.sh               - will install all the dependencies
- run.sh [inputFilePath]   - will run the application, where any passed parameters get passed on to your
                             implementation via $@ (see run.sh for an example).
- docker.sh                - A helper for invoking scripts via docker run e.g. ./docker.sh install.sh
                             will run install.sh inside an Ubuntu Xenial Docker container.
- score.sh                 - Will check that the application works against some basic test cases.
```

## Project Structure

### Overall Structure

1. The `test` directory contains all the unit and integration tests.
2. The `src` directory contains the all the source code including the app.ts file.
3. The `build` directory contains all compiled js files.

### Testing

This project uses jest.
Visit https://jestjs.io/ for details.

To execute tests:

```bash
npm run test
```

To calculate coverage:

```bash
npm run coverage
```

The coverage reports will be in the `coverage` folder

## FAQ

## Credits

Written by Shahriar Hasan Khan
Contact: shahriar27@hotmail.com
