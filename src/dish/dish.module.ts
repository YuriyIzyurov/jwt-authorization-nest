import { Module } from '@nestjs/common';
import { DishController } from './dish.controller';
import { DishService } from './dish.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Dish, DishSchema } from './schema/dish.schema';
import {
  Specification,
  SpecificationSchema,
} from './schema/specification.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Dish.name, schema: DishSchema }]),
    MongooseModule.forFeature([
      { name: Specification.name, schema: SpecificationSchema },
    ]),
  ],
  controllers: [DishController],
  providers: [DishService],
})
export class DishModule {}
