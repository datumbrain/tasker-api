# Step 1: Use the official Node.js image as the base image
FROM node:18

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Copy the package.json and package-lock.json files
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the app's source code
COPY . .

ARG DATABASE_URL
ARG HTTP_PORT
ARG JWT_SECRET
ENV DATABASE_URL=$DATABASE_URL
ENV HTTP_PORT=$HTTP_PORT
ENV JWT_SECRET=$JWT_SECRET

# Step 6: Generate the Prisma Client
RUN npx prisma generate

# Step 8: Expose the port the app will run on
EXPOSE 8080

# Step 9: Run migrations & Start the app
CMD ["sh", "-c", "npx primsa generate && npx prisma migrate deploy && npm start"]