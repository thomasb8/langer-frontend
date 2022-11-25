FROM node:18.12-alpine as builder

WORKDIR /app

COPY . .

RUN npm ci
RUN npm run build

FROM nginx:1.22.1

COPY ./nginx/templates /etc/nginx/templates
COPY --from=builder /app/dist /usr/share/nginx/html/


