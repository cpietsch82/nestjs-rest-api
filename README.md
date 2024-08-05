<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>

## Description

A little REST Api written in Typescript using the NestJS Framework ([Nest](https://github.com/nestjs/nest)).
This should be a basic framework with lots of services pre installed and preconfigured like Authentication, Database Connection (via Mongoose) etc.

## Authentication

For authentication i am using the Passport with the JWT strategy. All necessary informations about the npm package can you find here ([Passport](https://github.com/jaredhanson/passport)). Or here with an example integration in NestJS [Passport Integration in NestJS](https://docs.nestjs.com/recipes/passport).

## Installation

This repository needs a local mongodb connection or docker. If you are not familiar with setting up a local mongodb server, just use the docker compose file.
This generates a local mongodb server for you. Make sure you have the right mongodb connection credentials in `app.module.ts`.

#### Docker

For docker just use the following commands with the help of a `docker-compose.yml` at root.

`docker compose up`

After running the build process, you can stop Docker container with

`docker compose down`

### Add Sample Data to MongoDB Database

To add some sample data to your mongodb connection just run the following script.
The password of the DevelopmentUser ist "test". Later you can add new users with different passwords.

```bash
$ pnpm run seed
```

After that you have to install all package dependecies via pnpm.

```bash
$ pnpm install
```

## Running the app

Make sure you have all necessary environment variables in your .env.development before you start the application.

```bash
# development
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

For testing we are using a mongodb in-memory server

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## NEW FEATURES

- added auth/register route to add new users
- added passport authentication package with jwt strategy
- added webpack hot module reload
- integrate mongodb in-memory server for running tests

## TODOS

- extended tests
- add middleware to handle request limits
- add middleware to handle user authorization (CRUD for todos)
- add update password method

## Support

## Stay in touch

- Author - [Christian Pietsch](https://github.com/cpietsch82)
- LinkedIn - [@LinkedIn](https://www.linkedin.com/in/christian-pietsch-57247183/)

## License

[MIT licensed](LICENSE).
