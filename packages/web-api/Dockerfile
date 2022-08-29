FROM public.ecr.aws/bitnami/node:latest

WORKDIR /app

COPY ./package*.json ./
COPY ./tsconfig.json ./
COPY ./packages/web-api/ ./packages/web-api/
COPY ./packages/common/ ./packages/common/

RUN npm i

WORKDIR /app/packages/web-api

RUN npm run build

# EXPOSE 3006

# ENTRYPOINT ["tail", "-f", "/dev/null"]
ENTRYPOINT ["npm", "start"]
