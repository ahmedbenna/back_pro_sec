# Use an official Node.js runtime as a parent image
FROM node:16

# Set environment variables
ENV PORT=3000
ENV MONGODB="mongodb+srv://ahmed:OEviISwjQweAzS1Y@cluster0.4imka.mongodb.net/?retryWrites=true&w=majority"

ENV SECRET_JWT_CODE="jwt1234"
ENV ACCESS_TOKEN_SECRET="ats"
ENV REFRESH_TOKEN_SECRET="rts"

ENV CRYPTO_IV="5183666c72eec9e4"
ENV SECRET_KEY_CRYPTO="bf3c199c2470cb477d907b1e0917c17b"

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to /app
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the current directory contents to /app
COPY . .

# Expose port 3000
EXPOSE 3000

# Start the Node.js application
CMD ["node", "index.js"]