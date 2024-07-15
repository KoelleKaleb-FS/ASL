# Use the official Node.js image.
FROM node:14

# Install necessary build tools
RUN apt-get update && apt-get install -y python3 make g++ \
  && rm -rf /var/lib/apt/lists/*

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy package.json and package-lock.json files.
COPY package*.json ./

# Use root user during the installation
USER root

# Install dependencies
RUN npm install @jworkman-fs/wdv-cli

# If you have other dependencies in your package.json, run this instead
# RUN npm install

# Copy app files
COPY . .

# Expose the port the app runs on.
EXPOSE 8080

# Run the application.
CMD ["node", "app.js"]
