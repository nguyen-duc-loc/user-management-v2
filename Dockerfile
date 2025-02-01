# Build stage
FROM node:22.13-alpine3.20 AS builder

WORKDIR /app

COPY package*.json .

RUN npm install --force

COPY . .

RUN npm run build


# Run stage
FROM node:22.13-alpine3.20

WORKDIR /app

RUN apk add make

RUN apk add curl

RUN apk add tzdata

RUN curl -L https://github.com/golang-migrate/migrate/releases/download/v4.18.1/migrate.linux-amd64.tar.gz | tar xvz
RUN rm README.md LICENSE
RUN mv migrate /usr/bin

COPY --from=builder /app/package*.json .

COPY --from=builder /app/.next .next

COPY --from=builder /app/next.config.ts .

COPY --from=builder /app/*.sh .

COPY --from=builder /app/Makefile .
COPY --from=builder /app/database database

RUN npm install --force --production

RUN chmod +x /app/*.sh

EXPOSE 3000
