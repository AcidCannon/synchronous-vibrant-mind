FROM node:12.19

ENV PROJECT_ENV production
ENV NODE_ENV production

WORKDIR /app
ADD . /app

RUN yarn config set registry https://mirrors.huaweicloud.com/repository/npm/ && yarn install && yarn build && npm install -g http-server

EXPOSE 8081

CMD http-server ./build -p 8081
