import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import type { Request, Response } from 'express';
import { AppModule } from '../src/app.module.js';
import { configureCors } from '../src/configure-cors.js';

const expressApp = express();

let bootstrapPromise: Promise<void> | undefined;

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));
  configureCors(app);
  await app.init();
}

export default async function handler(req: Request, res: Response): Promise<void> {
  bootstrapPromise ??= bootstrap();
  await bootstrapPromise;
  expressApp(req, res);
}
