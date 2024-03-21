FROM node:latest

# Build client
WORKDIR /usr/src/app/client
COPY client/ ./
RUN npm install
RUN npm run build

# Build server
WORKDIR /usr/src/app/server
COPY server/ ./
RUN npm install
RUN npm run build

# Move built client to server's public folder for serving
RUN mv ../client/build ./public

EXPOSE 80

CMD npm run start
