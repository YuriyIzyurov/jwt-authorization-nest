import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function start() {
  try {
    dotenv.config();
    const isDev = process.env.NODE_ENV.trim() === 'development';
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create(AppModule);
    const corsOptions = {
      // origin: [process.env.ALLOWED_CLIENT_URL],
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      preflightContinue: true,
      optionsSuccessStatus: 204,
      credentials: true,
      allowedHeaders: ['Accept', 'Content-Type'],
      allowedMethods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    };
    if (isDev) {
      // corsOptions.origin.push(process.env.ALLOWED_CLIENT_LOCALHOST);
    }

    app.enableCors(corsOptions);

    await app.listen(PORT, () => console.log(`server is up on PORT ${PORT}`));
  } catch (e) {
    console.log(e);
  }
}
start();
