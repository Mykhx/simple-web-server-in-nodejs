FROM node:18-alpine

WORKDIR /code
RUN mkdir -p /code/Logs/

COPY package.json package.json
COPY package-lock.json package-lock.json
COPY src src
COPY WebResources WebResources

RUN npm install
EXPOSE 8080

CMD npm start

# shared logs directory