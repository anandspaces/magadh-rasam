# Stage 1: Build the frontend
FROM node:18-alpine AS build-stage

WORKDIR /app/frontend

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy source files and build the frontend
COPY . ./
RUN npm run build

# Stage 2: Serve the build with a lightweight HTTP server
FROM node:18-alpine

WORKDIR /app/frontend

# Install http-server (for serving the static build)
RUN npm install -g http-server

# Copy the build from the previous stage
COPY --from=build-stage /app/frontend/dist /app/frontend/dist

EXPOSE 3000
CMD ["http-server", "dist", "-p", "3000"]