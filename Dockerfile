FROM node:20-alpine

# Complete cache busting
RUN echo "NUCLEAR CACHE BUST: Node20-$(date +%s)"

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Delete any cached .next folder
RUN rm -rf .next

# Build the application
RUN npm run build

# Expose port
EXPOSE 8080

# Start the application
CMD ["npm", "start"]