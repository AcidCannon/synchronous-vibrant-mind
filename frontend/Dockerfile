# Use Dockerfile.alt if download speed of yarn is slow
FROM node:12.19

ENV PROJECT_ENV production
ENV NODE_ENV production

WORKDIR /app
ADD . /app

RUN npm install && npm run-script build && npm install -g serve

EXPOSE 8081

CMD serve -s build -p 8081
