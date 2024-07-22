FROM node:20.15.0-alpine3.19

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package.json ./

RUN npm install

# Bundle app source
COPY . .

# prisma generate
RUN npx prisma generate

# Build the app
RUN npm run build

# Serve the app
CMD ["npm", "start"]
