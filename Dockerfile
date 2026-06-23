# Use Node.js 20 LTS
FROM node:20-alpine AS base

# Install pnpm
RUN npm install -g pnpm@8.15.0

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN pnpm run build

# Production stage
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Install pnpm
RUN npm install -g pnpm@8.15.0

# Create a non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy package files and install production dependencies
COPY --from=base /app/package.json ./
COPY --from=base /app/pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod

# Copy built application
COPY --from=base /app/public ./public
COPY --from=base /app/.next ./.next

# Create cache directory with proper permissions before switching users
RUN mkdir -p /app/.next/cache/images && \
    chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Start the application
CMD ["pnpm", "start"]

