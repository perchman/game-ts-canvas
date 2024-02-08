FROM node:lts

RUN npm install -g http-server

WORKDIR /app

COPY /dist/. .

EXPOSE 8080

CMD ["http-server", "--port", "8080"]