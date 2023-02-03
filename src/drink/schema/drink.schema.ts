import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Specification } from '../../dish/schema/specification.schema';
import * as mongoose from 'mongoose';

export type DrinkDocument = HydratedDocument<Drink>;
export type PriceType = {
  ml50: number;
  ml100: number;
  bottle: number;
};

@Schema()
export class Drink {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop({ type: { ml50: Number, ml100: Number, bottle: Number } })
  price: PriceType;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Specification' })
  specification: Specification;
}

export const DrinkSchema = SchemaFactory.createForClass(Drink);
