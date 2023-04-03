FROM node:16

WORKDIR /app

RUN npm install -g npm@6.14.9

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "start-docker" ]


