import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { ObjectId } from 'mongoose';
import { ReviewService } from './review.service';

@Controller('/reviews')
export class ReviewController {
  constructor(private reviewService: ReviewService) {}

  @Post()
  create(@Body() dto: CreateReviewDto) {
    return this.reviewService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: ObjectId) {
    return this.reviewService.update(id);
  }

  @Get()
  getAll() {
    return this.reviewService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: ObjectId) {
    return this.reviewService.getOne(id);
  }

  @Delete(':id')
  delete(@Param('id') id: ObjectId) {
    return this.reviewService.delete(id);
  }
}
