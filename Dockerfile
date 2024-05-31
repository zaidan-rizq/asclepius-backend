FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN apt-get update && \
    apt-get install -y build-essential 

RUN npm install

COPY . .

ENV NODE_ENV=production

ENV PORT=3000

ENV MODEL_URL='https://storage.googleapis.com/asclepius-model-bucket/model-in-prod/model.json'

CMD [ "npm", "start" ]