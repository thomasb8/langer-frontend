FROM node:18.12-alpine as builder

ARG VITE_LANGER_BACKEND_URL
ENV VITE_LANGER_BACKEND_URL ${VITE_LANGER_BACKEND_URL}

WORKDIR /app

COPY . .

RUN npm ci
RUN npm run build

FROM nginx:1.22.1

COPY ./nginx/templates /etc/nginx/templates
COPY --from=builder /app/dist /usr/share/nginx/html/


