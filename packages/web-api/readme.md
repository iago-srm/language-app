# What this is

This is a NodeJS backend server _proof-of-concept_. I have implemented many of the most useful features you'd want in a backend server (see [this part](#why-it-is-cool)).  
In order to make this the code of a real project, all you have to do is add your own business entities (I have implemented a meaningless "user" entity, this is not an auth service) and choose the features you need, by removing features from the code and/or adding new ones (hopefully, as the project progresses, having to add new features to implement real projects will happen less often).

# Why it is cool

Here is a rundown of the concepts and technologies this project makes use of.

- Dependency Injection containerization with [awilix](https://github.com/jeffijoe/awilix).
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html).
- [Typescript](https://www.typescriptlang.org/) (along with [ts-node-dev](https://www.npmjs.com/package/ts-node-dev) for development).
- Cache layer with [Redis](https://redis.io/).
- [Docker](https://www.docker.com/). App is dockerized, and uses different docker-compose.yaml files to boot up dependent services, such as the postgres and redis dbs as well as pgadmin in a custom local network.
- Integration tests of all routes with [Jest](https://jestjs.io/).
- Internationalized validation messages.
- Validation of body and query parameters on all routes with [express-validator](https://express-validator.github.io/docs/).
- [TypeORM](https://typeorm.io/#/) to connect to Postgres.
- [Postgres](https://www.postgresql.org/) database.
- [Express](https://expressjs.com/).

# Branches

- **no-cache**: Only main database, no Redis, for applications that don't need a cache layer.

# Run locally

- It needs to run three containers simultaneously: redis, postgre and the app itself. Use the `docker-compose up` command to run all containers in the docker-compose.yaml file.

# Test

- In order to run the tests locally, you'll need NodeJS installed in your machine. Spin up redis and the db with `npm run docker-test`. Then run the test suites with `npm run test`.

# Development

- `npm run docker-dev` to spin up development db, redis and pgadmin.
- `npm run dev` to start app
- After each new environment variable created on '.env', run `npm run gen-env` to update .env.d.ts. That also updates .env.example (which is version-controlled).
- `docker-compose build` to rebuild app image after a change.
- `npm run typeorm:migration:generate -- -n migrationName` whenever there is a schema change and there is already data in prod. `npm run typeorm:migration:run` to perform all pending migrations.

# TODO

This is a work in progress. Here are my priorities moving forward

- CI/CD with Github Actions or Travis and run tests in a dedicated environment.
- Implement a branch with GraphQL.

My goal is to make this a proof-of-concept of a backend ready for a distributed systems environment. The following items are next in line in order to achieve that goal.

- Auth middleware (from @iago-srm/common).
- DB connection resiliance. There is no system in place to have the app retry the db connection in case it is severed, the app will just start to fail requests.
- Obervability and health check. Probably with the [ELK stack](https://www.elastic.co/what-is/elk-stack).

## Database GUIs

## postgres

### pgAdmin

In the browser, "Add New Server" and write "dev-postgres" in "Host name/address", as well as the credentials used on docker-compose. That should give you access to the db through the browser.

## redis

### Redis-Commander

Uncomment this container in the `docker-compose-dev.yaml` to use [redis commander](https://github.com/joeferner/redis-commander). Uncomment the appropriate "environment" lines based on what redis servers you have running.

## SSL

### Generate certificates on Windows

Use Git Bash, and do `openssl genrsa -out certificates/key.pem` e, então, `openssl req -new -key certificates/key.pem -out certificates/csr.pem`. Depois de preencher as informações, fazer `openssl x509 -req -days 365 -in certificates/csr.pem -signkey certificates/key.pem -out certificates/cert.pem`
