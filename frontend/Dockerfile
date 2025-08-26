# First stage: Build the TypeScript app
FROM node:20-alpine AS build 

WORKDIR /usr/src/app

COPY ./package*.json ./

RUN npm install

COPY . .

# Need environment variables at build time for Vite
ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL=${VITE_BACKEND_URL}

RUN npm run build 

# Second stage: Create the runtime image
FROM node:20-alpine

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/dist /usr/src/app/dist
COPY --from=build /usr/src/app/node_modules /usr/src/app/node_modules

EXPOSE 4173

# Need package.json to use the NPM scripts
COPY --from=build /usr/src/app/package.json /usr/src/app/package.json 

# Need "--" and "--host" to connect from the host machine
CMD ["npm", "run", "preview", "--", "--host"]
