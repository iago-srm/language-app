# Development
- When npm i is run (do it at project root), all package.json files are inspected and its dependencies are installed in the root node_modules
- When postgres is started with a volume, its boot time is shorter, but it inherits the volume's database. To force it to create new databases, remove the volumes first.
- `docker exec -ti auth-web-api /bin/sh`to access a container's terminal
## Prisma
### [Schema Prototyping](https://www.prisma.io/docs/guides/database/prototyping-schema-db-push)
- Do `npx prisma db push` to sync database with prisma schema. Used for dev only. If we add a required field without a default value, the table will have to be reset, losing its data. To do it, pass `--accept-data-loss`.
- After having prototyped and arriving at a stable schema, do `npx prisma migrate dev --name initial-state` to generate an up migration of the initial schema, and after each change, do `npx prisma migrate dev --name migration-name`. This will generate migration files for each schema change. With this, we'll have a migration history. It will also create entries in a _prisma_migrations table in the db.

# TODO
## Infrastructure
- Prometheus, Grafana and ElasticSearch monitoring
- Turn controllers into Lambdas
- Staging Environment identical to prod
## Frontend
- 