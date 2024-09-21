This README provides instructions for setting up and running both the backend and frontend components of our full stack project.

## Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Create a `.env` file and copy the contents of `.env.example` into it:
   ```
   cp .env.example .env
   ```

3. Start the PostgreSQL database using Docker:
   ```
   docker run --name postgres-db -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=secretpassword -e POSTGRES_DB=postgres-db -p 5432:5432 -d postgres
   ```

4. Install dependencies:
   ```
   npm install
   ```

5. Generate Prisma client:
   ```
   npx prisma generate
   ```

6. Build the project:
   ```
   npm run build
   ```

7. Start the backend server:
   ```
   npm run start
   ```

## Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file and copy the contents of `.env.example` into it:
   ```
   cp .env.example .env
   ```

4. Start the development server:
   ```
   npm run dev
   ```

5. Access the site in your browser at:
   ```
   http://localhost:5173/
   ```

## Note

Make sure you have Node.js, npm, and Docker installed on your system before starting the setup process.