FROM node:20-alpine

WORKDIR /app

# Copy package files first (for better layer caching)
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Expose port (Cloud Run uses PORT environment variable)
EXPOSE 8080

# Set environment variables for production
ENV NODE_ENV=production
ENV PORT=8080

# Start the application
CMD ["npm", "start"]