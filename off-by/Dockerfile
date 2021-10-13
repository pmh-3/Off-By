#Dockerfile for React client

#build react client
FROM node:14.16.0-alpine3.10

#Working directory is off-by
WORKDIR /usr/app

COPY package*.json ./
### Installing dependencies
RUN npm install -qy

#copy local files to app folder
COPY . .

EXPOSE 80

CMD ["npm", "run", "dev"]