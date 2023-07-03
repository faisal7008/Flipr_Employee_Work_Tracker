FROM node:18-alpine
WORKDIR /app/frontend
COPY package*.json ./
RUN npm ci --production --frozen-lockfile
COPY . .
RUN npm run build
EXPOSE 3000
CMD [ "npm", "run", "serve" ]
