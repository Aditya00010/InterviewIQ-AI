FROM node:20-slim

# Install system dependencies for Chromium
RUN apt-get update && apt-get install -y --no-install-recommends \
    chromium \
    fonts-liberation \
    && rm -rf /var/lib/apt/lists/*

# Environment variables for Puppeteer
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium
ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY package*.json ./

# Install production dependencies
RUN npm ci --only=production

COPY . .

# Set permissions for node user
RUN chown -R node:node /usr/src/app
USER node

EXPOSE 3000

CMD ["node", "server.js"]
