FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm rebuild bcrypt --build-from-source

EXPOSE 8000 

CMD [ "npm", "start" ]