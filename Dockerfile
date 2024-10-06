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
ENV DATABASE_URL=$DATABASE_URL

# Step 6: Generate the Prisma Client
RUN npx prisma generate

# Step 7: Run migrations to apply schema changes to the database
# Ensure the DATABASE_URL is set in your environment or in your secrets
RUN npx prisma migrate deploy

# Step 8: Expose the port the app will run on
EXPOSE 8080

# Step 9: Start the app
CMD ["npm", "start"]