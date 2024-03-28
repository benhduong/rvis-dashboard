FROM node:20.3.1-alpine AS development

WORKDIR /usr/app/dashboard
COPY package.json /usr/app/dashboard
COPY yarn.lock /usr/app/dashboard
RUN yarn install
COPY . /usr/app/dashboard

CMD [ "yarn", "dev" ]
