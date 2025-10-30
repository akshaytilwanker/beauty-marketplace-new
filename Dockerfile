FROM node:18-alpine

# Cache busting
RUN echo "FORCE CACHE BUST: 2024-10-30-$(date +%H%M%S)"

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