# Simple task

RESTful backend API

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Clone Project source
Copy the example env file and make the required configuration changes in the .env file
```
cp .env.example .env
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
## Migrations
If you want to add a column or run any migrations on the DB then this is the place to look.

```bash

# 1. If you want to create a migration.
$ npm run migrate:create [MIGRATION NAME IN SNAKE CASE]

# In container run below command to execute your migration:
$ npm run migrate

# OR to rollback your migration
$ npm run migrate:rollback
```
## Seeding
```bash
$ npm run seed
```
### Coding style

We follow the recommended Typescript coding style. Check out eslintrc.js. https://github.com/eslint/eslint

We have eslint run on save to help format files
