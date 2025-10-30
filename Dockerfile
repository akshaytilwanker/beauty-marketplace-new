FROM node:20-alpine

WORKDIR /app

# Copy package files first
COPY package*.json ./
RUN npm ci

# Copy source code (including .env.production)
COPY . .

# Build the application (Next.js will read from .env.production)
RUN npm run build

# Expose port
EXPOSE 8080

# Set environment variables for production
ENV NODE_ENV=production
ENV PORT=8080

# Start the application
CMD ["npm", "start"]