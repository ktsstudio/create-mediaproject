FROM node:12 as frontend_builder

WORKDIR /code

ADD package.json .
ADD yarn.lock .

RUN yarn install

ADD . .

RUN yarn build

FROM nginx:alpine

COPY --from=frontend_builder /code/public/ /usr/share/nginx/html
ADD nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80 80
