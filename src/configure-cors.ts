import type { INestApplication } from '@nestjs/common';

const allowedOrigins = [
  'https://studio.apollographql.com',
  ...(process.env.CORS_ORIGIN?.split(',').map((origin) => origin.trim()).filter(Boolean) ?? []),
];

export function configureCors(app: INestApplication): void {
  app.enableCors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Apollo-Require-Preflight', 'X-Apollo-Operation-Name'],
  });
}
