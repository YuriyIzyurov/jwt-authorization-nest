import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review, ReviewDocument } from './schema/review.schema';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>,
  ) {}

  async create(dto: CreateReviewDto): Promise<Review> {
    return await this.reviewModel.create({ ...dto, approved: false });
  }

  async getAll(): Promise<Review[]> {
    return this.reviewModel.find();
  }
  async getOne(id: ObjectId): Promise<Review> {
    return this.reviewModel.findById(id);
  }
  async delete(id: ObjectId): Promise<ObjectId> {
    const review = await this.reviewModel.findByIdAndDelete(id);
    return review.id;
  }
}
