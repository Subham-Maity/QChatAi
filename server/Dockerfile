# Use the official Node.js image as the base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

COPY prisma ./prisma/

# Install dependencies
RUN yarn

# Copy the entire project
COPY . .

# Build the NestJS application
RUN yarn run build

# Expose the port on which the NestJS server will run
EXPOSE 3333

# Start the NestJS server
CMD ["yarn", "run", "start:dev"]