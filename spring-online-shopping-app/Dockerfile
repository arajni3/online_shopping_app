FROM node:16.15.1
FROM openjdk:17.0.7

LABEL version="3.0"

LABEL description="ashwin online shopping app (version 1.0 was on Heroku)"

WORKDIR /usr/src/online_shopping_app

COPY target/*.jar app.jar

COPY frontend .

RUN cd frontend && npm install && npm run build

EXPOSE 5000


ENTRYPOINT ["java","-jar","/app.jar"]
