FROM node:latest

ARG PORT=80

# Copy dep files
WORKDIR /usr/src/app
COPY client/package*.json ./client/
COPY server/package*.json ./server/

# Install deps
RUN npm install -prefix client
RUN npm install -prefix server

# Copy source code
COPY client/ ./client/
COPY server/ ./server/

# Build client
WORKDIR /usr/src/app/client
RUN echo "REACT_APP_PLACES_API_KEY=AIzaSyC9W6SaadDl85omlft5uh6a6ztXuKwQrek" > .env
RUN npm run build

# Build server
WORKDIR /usr/src/app/server
RUN npm run build

# Move built client to server's public folder for serving
RUN mv ../client/build ./build/public

EXPOSE $PORT

CMD npm run start
