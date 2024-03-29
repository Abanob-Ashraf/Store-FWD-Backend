# Storefront Backend Project

## How to build and start the server

The project can be built and run in the following ways

## Required Technologies
The application must make use of the following libraries:
- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

### 1. Install all Dependencies

```sh
# install Dependencies
npm install
```

### 2. Database Setup

#### Database Creation

```sh
# create Database
CREATE DATABASE storefrontbackend; 
CREATE DATABASE storefrontbackend_test;
```

#### Database Migrations

```sh
# Migrations used to Create a Tables in Database
db-migrate up

# Migrations used to make Drop a Tables in Database
db-migrate down

# Migrations used in this project

db-migrate create add-users-table --sql-file
db-migrate create add-products-table --sql-file
db-migrate create add-orders-table --sql-file
db-migrate create add-ordered-products-table --sql-file
```

### 3. Environmental Variables (.env file contents)

```sh
PORT=3000
ENV=dev
POSTGRES_HOST=******
POSTGRES_DB=storefrontbackend
POSTGRES_DB_TEST=storefrontbackend_test
POSTGRES_USER=abano
POSTGRES_PASSWORD=1410
BCRYPT_PASSWORD=******
SALT_ROUND=10
TOKEN_SECRET=******
```

### 4. Build Project

```sh
npm run build

This command will build the typeScript code into JavaScript and save them in the `./build` folder.
```

### 5.1 Run Project

```sh
# Run Project as Developer
npm run dev

This command will start the server running on port `3000`.
```

### 5.2 Run Project

```sh
# Run Project as User
npm run start

This command will start the server running on port `3000`.
```

### 6. Testing, prettier and Linting

Here, test cases to test the project and also check that the code respects all the eslint rules and prettier to have a well formatted code.

```sh
# 1. Linting

npm run lint

# 2. prettiering

npm run prettier

# 3. Testing

npm run test
```

### 7. Refrencess

## Built With

```sh
- [NodeJS](https://nodejs.org/en/) - The JavaScript runtime.
- [Express](https://expressjs.com/) - The web framework.
- [TypeScript](https://www.typescriptlang.org/) - The language used.
- [PostgreSql](https://www.postgresql.org/) - The database used
- [Postman](https://www.postman.com/) - The program used to build, test and iterate my APIs
```
