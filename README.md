## Project setup

```bash
$ yarn install
```

## Compile and run the project

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Run tests

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Example Request

POST `http://localhost:3000/trading/analyze`
body:

```
{
    "startDate": "2025-05-01 12:00:00",
    "endDate": "2025-06-03 12:00:00"
}
```