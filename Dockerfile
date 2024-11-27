FROM node:22.11.0-alpine

USER node

WORKDIR /home/node

COPY package.json ./

RUN npm install

COPY src/ ./src/

EXPOSE 3500

CMD ["npm", "start"]