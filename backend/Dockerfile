FROM node:18-alpine
WORKDIR /app/backend
COPY package*.json ./
RUN npm ci --production --frozen-lockfile
COPY . .
EXPOSE 9000
CMD [ "npm", "start" ]