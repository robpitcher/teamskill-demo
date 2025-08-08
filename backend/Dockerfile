# syntax=docker/dockerfile:1

# Build stage: install deps, generate Prisma client, build TypeScript
FROM node:20-bookworm-slim AS builder
WORKDIR /app

# Install dependencies
COPY backend/package*.json ./
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

# Copy Prisma schema and generate client
COPY backend/prisma ./prisma
RUN npm run prisma:generate

# Copy source and build
COPY backend/tsconfig.json ./
COPY backend/src ./src
RUN npm run build

# Runtime stage
FROM node:20-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production

# Copy built assets and node_modules (includes Prisma engines and generated client)
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

# Expose API port
EXPOSE 4000

# Start the server
CMD ["node", "dist/index.js"]
