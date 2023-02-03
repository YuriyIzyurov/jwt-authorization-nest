import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Dish } from './dish.schema';
import * as mongoose from 'mongoose';

export type SpecificationDocument = HydratedDocument<Specification>;

@Schema()
export class Specification {
  @Prop()
  name: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Dish' }] })
  dishes: Dish[];
}

export const SpecificationSchema = SchemaFactory.createForClass(Specification);
