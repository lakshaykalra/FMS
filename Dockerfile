FROM node:22

WORKDIR /app

COPY package*.json . /app/

RUN npm install -f

CMD ["npm", "run", "start"]