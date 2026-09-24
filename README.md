# Digital Card Backend

Backend application for a digital professional card. The API presents my profile, skills, work experience, and projects through GraphQL.

## Tech Stack

- Node.js
- TypeScript
- NestJS
- GraphQL / Apollo Sandbox
- Prisma
- PostgreSQL
- Docker

## Features

- Professional profile data
- Skills list
- Work experience with achievements
- Projects list
- PostgreSQL database integration
- Prisma migrations
- Automatic database seed script
- Docker Compose setup for the API and database

## Project Structure

```txt
src/
  prisma/
    prisma.module.ts
    prisma.service.ts
  profile/
    models/
    profile.module.ts
    profile.resolver.ts
    profile.service.ts
prisma/
  migrations/
  schema.prisma
  seed.ts
test/
  app.e2e-spec.ts
```

## Local Setup

Install dependencies:

```bash
npm install
```

Start PostgreSQL:

```bash
docker compose up -d postgres
```

Run migrations and seed the database:

```bash
npm run db:setup
```

Start the application:

```bash
npm run start:dev
```

Open Apollo Sandbox:

```txt
http://localhost:3000/graphql
```

## Docker Setup

Run the full application with Docker:

```bash
docker compose up --build
```

The backend will start on:

```txt
http://localhost:3000/graphql
```

The application container runs database migrations and seed data before starting the production server.

## Example GraphQL Query

```graphql
query {
  profile {
    name
    description
    githubUrl
    linkedinUrl
    skills {
      name
    }
    experience {
      company
      position
      period
      achievements
    }
    projects {
      name
      url
      description
    }
  }
}
```

## Useful Scripts

```bash
npm run build
npm run lint
npm run test
npm run test:e2e
npm run db:setup
npm run start:dev
```

## Environment Variables

For local development, create a `.env` file:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/digital_card?schema=public"
```

Docker Compose provides its own database URL for the application container.

## Vercel Deployment

This project includes a Vercel serverless entrypoint in `api/index.ts` and routes all requests through it with `vercel.json`.

Before deploying, configure a hosted PostgreSQL database in Vercel:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
```

Then run migrations and seed data against that production database:

```bash
npm run db:migrate
npm run db:seed
```

The deployed GraphQL endpoint is available at:

```txt
https://<your-vercel-domain>/graphql
```
