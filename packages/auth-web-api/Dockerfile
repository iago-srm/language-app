FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

COPY ../common ../common

RUN npm run build

# ENTRYPOINT ["npm", "start"]
