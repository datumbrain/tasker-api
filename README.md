# Tasker API

[![CI Build & Publish to Docker Hub](https://github.com/naumanzchaudhry/tasker-api/actions/workflows/ci.yml/badge.svg)](https://github.com/naumanzchaudhry/tasker-api/actions/workflows/ci.yml)

This is the API for a sample app created for [TDD in Legacy Code Transformation](https://github.com/naumanzchaudhry/tdd-in-legacy-codebase) journey

## Getting Started

### Setup .env

Copy `.env.sample` to `.env` and update the values accordingly.

Configure the `DATABASE_URL` to point to your PostgreSQL database by modifying username, password, and database name.

### Install Dependencies

```bash
npm install
```

### Start the server

```
npm run dev
```
### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run Integration Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:integration
```

### Run Component Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:component
```

### Run Contract Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:contract
```

### Run All Tests

```
npm run test
```

## Contributors

| Name          | Role              |
| ------------- | ----------------- |
| Nauman Zafar  | Frontend Engineer |
| Muaviya Imran | Frontend Engineer |