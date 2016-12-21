FROM node

RUN mkdir -p /usr/src/bf-admin-express
WORKDIR /usr/src/bf-admin-express

COPY . /usr/src/bf-admin-express
RUN npm install

EXPOSE 3000

CMD [ "npm", "run", "dev" ]
