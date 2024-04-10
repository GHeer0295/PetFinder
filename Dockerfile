FROM node:latest

ARG PORT=80

# Build client
WORKDIR /usr/src/app/client
COPY client/ ./
RUN echo "REACT_APP_PLACES_API_KEY=AIzaSyC9W6SaadDl85omlft5uh6a6ztXuKwQrek" > .env
RUN npm install
RUN npm run build

# Build server
WORKDIR /usr/src/app/server
COPY server/ ./
RUN npm install
RUN npm run build

# Move built client to server's public folder for serving
RUN mv ../client/build ./build/public

EXPOSE $PORT

CMD npm run start
