FROM node:16.10

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8000

RUN git clone https://github.com/vishnubob/wait-for-it.git

