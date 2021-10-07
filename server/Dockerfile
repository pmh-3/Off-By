#Dockerfile for Node Express Backend

FROM node:14.16.0-alpine3.10

#Create App Directory
RUN mkdir -p /usr/app
WORKDIR /usr/app

#install Dependencies
COPY package*.json ./

RUN npm install -qyg nodemon@2.0.7
RUN npm install -qy

#copy app source code
COPY . .

#Exports
EXPOSE 5000

CMD ["npm","start"]

