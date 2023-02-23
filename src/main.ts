import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

async function start() {
  try {
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create(AppModule, { cors: true });
    app.enableCors(corsOptions);
    await app.listen(PORT, () => console.log(`server is up on PORT ${PORT}`));
  } catch (e) {
    console.log(e);
  }
}
start();
