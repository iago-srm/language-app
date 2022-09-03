FROM public.ecr.aws/bitnami/node:latest

WORKDIR /app

ENV npm_config_cache=./.npm

COPY ./package*.json ./
COPY ./tsconfig.json ./
COPY ./packages/auth-web-api/ ./packages/auth-web-api/
COPY ./packages/common-core/ ./packages/common-core/
COPY ./packages/common-platform/ ./packages/common-platform/
COPY ./packages/common-utils/ ./packages/common-utils/

RUN npm i

RUN chmod -R 777 node_modules/

WORKDIR /app/packages/auth-web-api

RUN npm run build

# EXPOSE 3006

# ENTRYPOINT ["tail", "-f", "/dev/null"]

ENTRYPOINT ["npm", "start"]
