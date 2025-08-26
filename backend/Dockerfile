# First stage: Build the TypeScript app
FROM node:20-alpine AS build 

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build 

# Second stage: Create the runtime image
FROM node:20-alpine

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/dist /usr/src/app/dist
COPY --from=build /usr/src/app/node_modules /usr/src/app/node_modules

EXPOSE 3000

CMD ["node", "dist/server.js"]
