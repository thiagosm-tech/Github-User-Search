FROM node:18.15.0-alpine3.16 as github-user-search

WORKDIR /app

COPY package.json /app

RUN npm install 

COPY . .

RUN npm run build

FROM nginx:alpine

VOLUME /var/cache/nginx

COPY --from=github-user-search app/dist/github-user-search usr/share/nginx/html

COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf
