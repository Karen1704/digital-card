FROM node:24-alpine

WORKDIR /usr/src/app

COPY package*.json ./
COPY prisma ./prisma
COPY prisma7.config.ts ./
RUN npm ci
RUN npx prisma generate --config prisma7.config.ts

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod:db"]
