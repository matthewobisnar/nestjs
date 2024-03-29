# BUILD FOR PRODUCTION ----------------------------------------

FROM node:18-slim as build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install 

COPY . .

RUN npm run build

# Running `npm ci` removes the existing node_modules directory and passing in 
# --only=production ensures that only the production dependencies are installed. 
# This ensures that the node_modules directory is as optimized as possible
RUN npm ci --only=production && npm cache clean --force

USER node

# PRODUCTION -----------------------------------------------

FROM node:18-slim AS production

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/node_modules ./node_modules
# COPY --from=build /usr/src/app/package*.json ./
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/env ./env

USER node

CMD ["node", "dist/main.js"]