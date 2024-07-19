# E-commerce Sign-Up and Login Flow

## Project Overview

This project is a Next.js application that provides a simple sign-up and login flow for an e-commerce website with a protected page of categories. Users can register, log in, and view a list of categories in a paginated format. The application allows users to mark categories of interest, which are saved to the database and retained across sessions.

**Deployed Application:** [https://roc8-commerce-ten.vercel.app/](https://roc8-commerce-ten.vercel.app/)

**GitHub Repository:** [https://github.com/asadansari8840/roc8Commerce.git](https://github.com/asadansari8840/roc8Commerce.git)

## Technology Stack

-   **Framework:** Next.js
-   **Database:** PostgreSQL (using Prisma ORM)
-   **CSS Framework:** Tailwind CSS
-   **API Handling:** tRPC
-   **Authentication:** JWT token based authentication
-   **UI Design:** [Figma Design Link](https://www.figma.com/file/EjNZKDNTtgERV5PgF0mxnt/MERN-Assignment?type=design&node-Id=33:667&mode=design&t=6k9GiDcswPavMOTD-1)

## Project Setup

### Prerequisites

-   Node.js (v16 or later)
-   PostgreSQL database
-   `npm` or `yarn`

### Cloning the Repository

- git clone https://github.com/asadansari8840/roc8Commerce.git
- `cd roc8Commerce`

### Installation

- Install the dependencies:

`npm install`
# or
`yarn install`

### Database Setup

- Setup Environment Variables

Create a .env file in the root directory of your project with the following variables:

env

`DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE_NAME`
`NODE_ENV = development`
`ACCESS_TOKEN_JWT_SECRET=<your-secret>`
`REFRESH_TOKEN_JWT_SECRET=<your-secret>` 
`COOKIE_EXPIRE=<in-days-eg:5>`
`JWT_REFRESH_TOKEN_EXPIRE=<in-days-eg:7d>`
`JWT_ACCESS_TOKEN_EXPIRE=<in-days-eg:15min> //must be less than Refresh token`

##### Replace USER, PASSWORD, HOST, PORT, and DATABASE_NAME with your PostgreSQL credentials.

### Generate Prisma Client

`npm run postinstall`

### Seed the Database

- Generate 100 categories using the provided seed script:

`npm run db:category:seed`

- Migrate the Database
Apply the latest migrations:

`npm run db:migrate`

### Running the Application Locally

- Development Mode

To start the development server: `npm run dev` The application will be available at http://localhost:3000.

### Production Build

- To build and start the application for production:

`npm run build`
`npm start`
The application will be available at http://localhost:3000.
