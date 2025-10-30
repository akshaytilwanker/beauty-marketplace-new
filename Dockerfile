FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Expose port
EXPOSE 8080

# Start the application
CMD ["npm", "start"]