FROM node:22-alpine

WORKDIR /app

COPY package.json .

RUN npm i

COPY . .

EXPOSE 3001
# required for docker desktop port mapping

CMD ["npm", "start"]