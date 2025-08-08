# syntax=docker/dockerfile:1

# --- Build stage ---
FROM node:20-bookworm-slim AS builder
WORKDIR /app

# Install dependencies
COPY frontend/package*.json ./
RUN npm install --verbose

# Add node_modules/.bin to PATH
ENV PATH="/app/node_modules/.bin:$PATH"

# Copy source and build
COPY frontend/tsconfig.json ./
COPY frontend/vite.config.ts ./
COPY frontend/index.html ./
COPY frontend/src ./src
RUN npm run build

# --- Runtime stage (Nginx) ---
FROM nginx:alpine AS runner
WORKDIR /usr/share/nginx/html

# Copy built static files
COPY --from=builder /app/dist ./

# Nginx config: serve app and proxy /api to backend
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 5173
CMD ["nginx", "-g", "daemon off;"]
