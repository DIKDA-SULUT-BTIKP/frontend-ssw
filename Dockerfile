# Use an official Node runtime as the base image
FROM node:20

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the entire React app to the container
COPY . .

# Expose the port the app runs on
EXPOSE 3005

# Start the React application
CMD ["npm", "start"]
