FROM node:20-alpine

# Accept build arguments
ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY

# Set as environment variables for the build
ENV NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY

WORKDIR /app

# Copy package files first
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Build the application (will now have env vars)
RUN npm run build

# Expose port
EXPOSE 8080

# Set environment variables for production
ENV NODE_ENV=production
ENV PORT=8080

# Start the application
CMD ["npm", "start"]