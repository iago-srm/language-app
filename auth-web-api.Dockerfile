FROM node:alpine

WORKDIR /app

COPY ./package*.json ./
COPY ./tsconfig.json ./
COPY ./packages/auth-web-api/ ./packages/auth-web-api/
COPY ./packages/common/ ./packages/common/

RUN npm i

WORKDIR /app/packages/auth-web-api

RUN npm run build


ENTRYPOINT ["tail", "-f", "/dev/null"]