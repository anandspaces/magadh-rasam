# Stage 1: Build the frontend
FROM node:18-alpine AS build-stage

WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy source files and build the frontend
COPY . ./
RUN npm run build

# Stage 2: Serve the build with a lightweight HTTP server
FROM node:18-alpine

WORKDIR /app

# Install http-server (for serving the static build)
RUN npm install -g http-server

# Copy the build from the previous stage
COPY --from=build-stage /app/dist /app/dist

EXPOSE 3000
CMD ["http-server", "dist", "-p", "3000"]