# source: https://www.tomray.dev/nestjs-docker-production

# BUILD FOR LOCAL DEVELOPMENT

FROM node:18.18.1-alpine AS development

# Update the list of available packages
# RUN apk update

# Install SQLite3
# RUN apk add sqlite

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
# COPY --chown=node:node package*.json ./
COPY package*.json ./

# Install app dependencies
RUN npm install --force 

# RUN chmod -R 777 node_modules

# Bundle app source
# COPY --chown=node:node . .
COPY . .


# Use the maintainer user from the image (instead of the root user)
# USER node

# -------------------------------------------------------------
# BUILD FOR PRODUCTION

FROM node:18-alphine as build

# Create app directory
WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

# In order to run `npm run build` we need access to the Nest CLI which is a dev dependency. 
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

# Bundle app source
COPY --chown=node:node . .

# Run the build command which creates the production bundle
RUN npm run build

# Set NODE_ENV environment variable
ENV NODE_ENV production

# Running `npm ci` removes the existing node_modules directory and passing in 
# --only=production ensures that only the production dependencies are installed. 
# This ensures that the node_modules directory is as optimized as possible
RUN npm ci --only=production && npm cache clean --force

USER node

# -----------------------------------------------------------------------------
# PRODUCTION

FROM node:18-alpine AS production

# Copy the bundled code from the build stage to the production image
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

# Start the server using the production build
CMD [ "node", "dist/main.js" ]
 
