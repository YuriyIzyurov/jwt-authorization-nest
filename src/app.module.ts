import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { DishModule } from './dish/dish.module';
import { DrinkModule } from './drink/drink.module';
import { ReviewModule } from './review/review.module';

@Module({
  imports: [
    DishModule,
    DrinkModule,
    ReviewModule,
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    MongooseModule.forRoot(process.env.DB_URI),
    ConfigModule.forRoot(),
  ],
})
export class AppModule {}
