FROM node:18-alpine3.17
WORKDIR /app
COPY package*.json ./
RUN npm install --production
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD [ "npm", "run", "start:prod" ]