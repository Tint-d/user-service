# Base image
FROM node:22.3.0

# Set working directory
WORKDIR /usr/src/app

# Install pnpm globally
RUN npm install -g pnpm

# Copy and install dependencies using pnpm
COPY package.json pnpm-lock.yaml ./

# Copy the rest of the application
COPY . .

# RUN npx prisma migrate deploy   
RUN npx prisma generate  

# Build the application
RUN pnpm run build

# Expose the application's port
EXPOSE 3000

# Command to run the app
CMD ["pnpm", "run", "start:dev"]

