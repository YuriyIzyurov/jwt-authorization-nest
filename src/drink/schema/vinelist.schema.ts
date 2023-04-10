import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {HydratedDocument, ObjectId} from 'mongoose';
import * as mongoose from 'mongoose';
import { Drink } from './drink.schema';

export type VineListDocument = HydratedDocument<VineList>;

@Schema()
export class VineList {
  @Prop()
  name: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Drink' }] })
  drinks: ObjectId[];
}

export const VineListSchema = SchemaFactory.createForClass(VineList);
