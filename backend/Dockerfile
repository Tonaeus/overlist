# First stage: Build the TypeScript app
FROM node:20-alpine AS build 

WORKDIR /usr/src/app

COPY package*.json ./

# Install only production dependencies
RUN npm install

COPY . .

RUN npm run build 

# Second stage: Create the runtime image
FROM node:20-alpine

WORKDIR /usr/src/app

# Copy only the necessary files from the build stage
COPY --from=build /usr/src/app/dist /usr/src/app/dist
COPY --from=build /usr/src/app/node_modules /usr/src/app/node_modules

EXPOSE 3000

CMD ["node", "dist/server.js"]
