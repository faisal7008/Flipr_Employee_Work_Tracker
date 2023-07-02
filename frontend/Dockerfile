FROM node:18
WORKDIR /app/frontend
COPY package*.json ./
RUN npm ci --production --frozen-lockfile
COPY . .
EXPOSE 3000
CMD [ "npm", "start" ]