# Base image
FROM node:14-alpine

# Set the working directory
WORKDIR /WebApp

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire app
COPY . .

# Build the app
RUN npm run build

# Set the production environment variable
ENV NODE_ENV=production

# Expose the port where the app will run
EXPOSE 3000

# Start the app
CMD ["npm", "start"]

