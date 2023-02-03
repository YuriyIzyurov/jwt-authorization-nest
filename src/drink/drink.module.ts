import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Drink, DrinkSchema } from './schema/drink.schema';
import { VineList, VineListSchema } from './schema/vinelist.schema';
import { DrinkController } from './drink.controller';
import { DrinkService } from './drink.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Drink.name, schema: DrinkSchema }]),
    MongooseModule.forFeature([
      { name: VineList.name, schema: VineListSchema },
    ]),
  ],
  controllers: [DrinkController],
  providers: [DrinkService],
})
export class DrinkModule {}
