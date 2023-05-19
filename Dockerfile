# Use a lighter version of Node as a parent image
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the dependencies file to the working directory
COPY package*.json ./

# Install any needed packages
RUN npm install

RUN npm install -g typescript

# Copy the rest of your app's source code from your host to your image filesystem.
COPY src/ .

# Build app
RUN tsc server.ts

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Run the app when the container launches
CMD [ "node", "server.js" ]
