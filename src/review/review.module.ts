import { Module } from '@nestjs/common';
import { ReviewController } from 'src/review/review.controller';
import { ReviewService } from 'src/review/review.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Review, ReviewSchema } from 'src/review/schema/review.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Review.name, schema: ReviewSchema }]),
  ],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
