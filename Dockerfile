FROM node:16

WORKDIR /app

COPY . /app

RUN npm i

EXPOSE 5000

CMD ["npm", "run", "dev"]