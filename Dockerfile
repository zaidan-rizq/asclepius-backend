FROM node:buster-slim

ENV NODE_ENV=production
ENV PORT=3000
ENV MODEL_URL='https://storage.googleapis.com/asclepius-model-bucket/model-in-prod/model.json'

COPY . .

RUN apt-get update && \
    apt-get install -y build-essential \
    wget \
    python3 \
    make \
    gcc \
    libc6-dev

RUN npm install

CMD [ "npm", "run", "prod" ]