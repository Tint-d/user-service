# Base image
FROM node:16

# Set working directory
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy and install dependencies using pnpm
COPY pnpm-lock.yaml ./
COPY package.json ./
RUN pnpm install --frozen-lockfile

# Copy the rest of the application
COPY . .

# Build the application
RUN pnpm run build

# Expose the application's port
EXPOSE 3000

# Command to run the app
CMD ["pnpm", "run", "start:dev"]
