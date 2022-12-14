![logo](img/readme_logo.png)

![GitHub last commit](https://img.shields.io/github/last-commit/iago-srm/language-app)
![GitHub language count](https://img.shields.io/github/languages/count/iago-srm/language-app)
![GitHub top language](https://img.shields.io/github/languages/top/iago-srm/language-app)
![Lines of code](https://img.shields.io/tokei/lines/github/iago-srm/language-app)

# Overview

This is my Computer Engineering senior thesis. I got my degree in 2022 from the University of São Paulo.

It is a language learning platform. Users can sign in as either instructors or students. Instructors will author language learning activities and students will complete them and get written feedback from their instructors.

Watch [this video](https://youtu.be/FuYyzwA2rWM) for a demonstration of how it works.

![searching for activities](img/4.3.png)
![doing activity](img/4.4.2.png)
![seeing feedback](img/4.6.3.png)

<div>
  <img src="https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white" alt="" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="" />
    <img src="https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white" alt="" />
  <img src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white" alt="" />
  <img src="https://img.shields.io/badge/terraform-%235835CC.svg?style=for-the-badge&logo=terraform&logoColor=white" alt="" />
  <img src="https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white" alt="" />
  <img src="https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white" alt="" />

</div>

# Architecture

The app is designed as a **client-server** architecture with **microsservices**.

The frontend is in Next.js and deployed to Vercel.

The backend consists of two Node.js REST APIs, one that takes care of authentication and authorization and another one that does all the rest of the domain logic.

<img src="img/simplified-architecture.png" alt="drawing" width="450"/>

All of the backend is in AWS. Both applications are **Dockerized** and deployed by ECS (with Fargate). They communicate via SQS, and persist their data on a single (for cost purposes) instance of RDS running Postgre. S3 is used to store user profile pictures.

There is a [**bastion host**](https://aws.amazon.com/solutions/implementations/linux-bastion/) inside the VPC which I can use to see the contents of the databases.

There are two **CICD pipelines**, one which builds the Docker images and deploys the backend applications to a staging environment after pushes to _develop_ and another one which deploys those containers to a production environment after pushes to _main_. Github actions run tasks which check for linting, formatting and run automated tests.

All of AWS infra is provisioned using **Terraform** (see the IaaC in _/infra_).

# Authentication and Authorization

The auth API takes care of all basic authentication funcionalities, such as sign up, sign in, change of passwords, verification of accounts, and change of profile pictures.

When a user signs in, the auth app returns a **JWT token** with the user's current token version (which starts at 0 on sign up). The token is stored on the browser and sent on all requests to the domain app, which will respond to requests only if the token is valid and its token version is the user's most current one.

When a user signs out, the auth app will increment the token version and send a message via the queue to the domain app, so that it persists the most current token version for that user. That allows me to invalidate and reject requests from all current sessions of a user.

# Frontend

It uses some version of [atomic design](https://atomicdesign.bradfrost.com/chapter-2/)

# Backend

## Clean Architecture

The code design closely follows the [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html).

![folder structure](img/clean-arch.png)

## Platform Code

[Platform code](https://softwareengineeringdaily.com/2020/02/13/setting-the-stage-for-platform-engineering/) is common code, used by both backend applications. It consists of APIs created to hide complexity from product teams (who build the actual use cases of the microsservices), like SDKs for external services as well as adapters for HTTP servers and DI Containers.

Here is all of the Clean Architecture's Framework layer code.

# Infrastructure

## AWS and Terraform

# Development Experience

## Monorepo

All applications and code dependencies exist on this repository, under _src/packages_.

- **auth_web_api** is the backend authentication Node.js API.
- **common-core** contains business rules which are shared by all three apps.
- **common-platform** contains the backend platform code, as [described above](#platform-code).
- **common-utils** contains code related to errors, testing utils and internationalization, used by all three apps.
- **web_api** is the backend domain Node.JS API.
- **web_app** is the frontend Next.js API.

## Developing Locally

In order to setup the entire infrastructure locally, these are the steps:

- Copy _.env.example_ into a new _.env_ file, and fill in the appropriate values. You will need AWS credentials in order to access S3 and SQS, and a SendGrid account to send e-mails.
- Run `docker-compose up --build` on the root of the project to build the necessary images locally and start the application servers and database instance. Change the entrypoint of the services to `npm run dev` to leverage ts-node-dev.
- Run `npm run dev` on _packages/web-app_ to run the Next.js server.

## Pre-production and Production Environments

There is a staging and a production environment. Both the front-end in Vercel and the AWS infrastructure listen for changes in the Github repo, on branches develop and main, to update the staging and production environments, respectively.

_These environments do not exist on the IaaC on the main branch for cost-saving reasons (extra ALB outside free tier), but do at the tag staging_and_prod_.

## CICD

The project is setup to follow some version of [GitLab Workflow](https://docs.gitlab.com/ee/topics/gitlab_flow.html).

All feature branches come out of develop, and are merged into it after Code Review. Merging into develop sets out pre-production CICD:

- **CI**. When there are pushes to develop, Github Actions check formatting, linting and run unit and integration test scripts on the frontend as well as on both backend applications.
- **CD**. If all CI checks pass, CD starts (see Infra TODO). The staging front-end application is updated on Vercel whenever the commit has changes to _packages/web-app_ or _packages/common-core_, and backend applications staging applications are redeployed via AWS' staging-code-pipeline (see Infra TODO), which builds the images and updates ECS' task definitions to use the new containers.

After manual QA and e2e tests (not implemented), develop is merged into main by the Tech Lead, which automatically sets out a production deploy via another CD pipeline. Whenever there are changes to _main_, Vercel redeploy the production front-end app and main-code-pipeline will redeploy the backend apps using the images built on the staging CICD.

# TODO

## Project Setup

- lint backend code

## Infrastructure

- AWS Distro and OTeL for observability.

### CICD

- Improve CICD to support building based on paths on AWS CD. Currently, both applications' CD will trigger whenever there is any change anywhere in the monorepo.
- CD actually starts at the same time as CI. Have CI greenlight CD instead, by running CI on pushes to feature branches and CD on pushes to develop and main.

## Frontend

The front-end needs some serious refactoring and reconsidering of code design. And automated tests.

- Refactor API calls, separate handlers from hooks.
- Refactor instruction components, have different ones for creating activities, doing activities and displaying done activities.
- [Refactor useEffects into custom hooks](https://www.youtube.com/watch?v=MFj_S0Nof90)
- Rethink approach to internationalization of interface.
- Provide loader components for pages, to avoid weird page transitions.
