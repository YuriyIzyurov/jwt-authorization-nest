import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { HttpExceptionFilter } from './helpers/http-exception-filter';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { ValidationError } from 'class-validator';

async function start() {
  try {
    dotenv.config();
    const isDev = process.env.NODE_ENV === 'development';
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create(AppModule);
    const corsOptions = {
      origin: [process.env.ALLOWED_CLIENT_URL],
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      preflightContinue: false,
      optionsSuccessStatus: 204,
      credentials: true,
      allowedHeaders: ['Accept', 'Content-Type', 'Authorization'],
      allowedMethods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    };
    if (isDev) {
      corsOptions.origin.push(process.env.ALLOWED_CLIENT_LOCALHOST);
    }

    app.enableCors(corsOptions);
    app.useGlobalPipes(
        new ValidationPipe()
    );
    await app.listen(PORT, () => console.log(`server is up on PORT ${PORT}`));
  } catch (e) {
    console.log(e);
  }
}
start();
