# BUILD FOR LOCAL DEVELOPMENT --------------------------------

FROM node:18.18.1-alpine AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install 

COPY . .

# USER node

# BUILD FOR PRODUCTION ----------------------------------------

FROM node:18.18.1-alpine as build

WORKDIR /usr/src/app

COPY package*.json ./

COPY --from=development /usr/src/app/node_modules ./node_modules

COPY . .

# RUN npm run migration:up:prod

RUN npm run build

# Running `npm ci` removes the existing node_modules directory and passing in 
# --only=production ensures that only the production dependencies are installed. 
# This ensures that the node_modules directory is as optimized as possible
RUN npm ci --only=production && npm cache clean --force

USER node

# PRODUCTION -----------------------------------------------

FROM node:18.18.1-alpine AS production

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/package*.json ./
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/env ./
COPY --from=build /usr/src/app/production.sqlite ./

USER node

CMD [ "node", "dist/main.js" ]
 
