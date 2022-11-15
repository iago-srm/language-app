# Overview

# Techonologies

# Development

- When npm i is run (do it at project root), all package.json files are inspected and its dependencies are installed in the root node_modules
- When postgres is started with a volume, its boot time is shorter, but it inherits the volume's database. To force it to create new databases, remove the volumes first.
- If you add a new package to a server, you have to build the image all over again

## Prisma

### [Schema Prototyping](https://www.prisma.io/docs/guides/database/prototyping-schema-db-push)

- Do `npx prisma db push` to sync database with prisma schema. Used for dev only. If we add a required field without a default value, the table will have to be reset, losing its data. To do it, pass `--accept-data-loss`.
- After having prototyped and arriving at a stable schema, do `npx prisma migrate dev --name initial-state` to generate an up migration of the initial schema, and after each change, do `npx prisma migrate dev --name migration-name`. This will generate migration files for each schema change. With this, we'll have a migration history. It will also create entries in a \_prisma_migrations table in the db.

# TODO

## Project Setup

- lint backend code

## Infrastructure

- AWS Distro and OTeL for observability
- Improve CICD. Following options have been tried
- - Option 1 (currently implemented): Use a Codepipeline that triggers whenever the develop or main receive pushes and builds and deploys the project to its respective environment. Problem: can't select monorepo paths that trigger builds. Any update anywhere in the monorepo triggers builds of all services. In order to prevent unecessary builds, I have disabled the transition from the Source to the Build stage, and just trigger the pipeline manually whenever I want a new deploy.
- - Option 2 (partially implemented in branch cicd-1): Employ a Codebuild project to listen to Github code changes. This accepts a webhook, which, in turn, lets you select paths. Then, this Codebuild project uses AWS CLI to trigger only the desired Codepipeline. Problems: Couldn't figure out how to build a pipeline that starts with the build stage, or has a source stage that only triggers with the CLI call. Also, very hacky.
- - Option 3 (not yet explored). Use Github Actions to do CD too. It is currently only doing CI (testing and linting)

## Frontend

- [BUG] CEFR Select keeps last choice when filters are cleared.
