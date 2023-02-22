import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, now } from 'mongoose';

export type ReviewDocument = HydratedDocument<Review>;

@Schema({ timestamps: true, collection: 'reviews' })
export class Review {
  @Prop()
  name: string;

  @Prop()
  rating: number;

  @Prop()
  date: string;

  @Prop()
  text: string;

  @Prop()
  approved: boolean;

  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ default: now() })
  updatedAt: Date;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
