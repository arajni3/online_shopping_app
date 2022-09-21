FROM node:16.15.1

LABEL version="2.0"

LABEL description="ashwin online shopping app (version 1.0 was on Heroku)"

WORKDIR /usr/src/online_shopping_app

COPY package*.json ./
RUN npm cache clean --force && npm run build

COPY . . 

EXPOSE 5000

CMD ["npm", "run", "start"]
