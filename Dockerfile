FROM node:16.16.0
WORKDIR /frontend/
COPY . /frontend/
RUN npm install
EXPOSE 7777