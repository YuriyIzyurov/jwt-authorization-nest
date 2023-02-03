import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { DishService } from './dish.service';
import { CreateDishDto } from './dto/create-dish.dto';
import { ObjectId } from 'mongoose';
import { CreateSpecificationDto } from './dto/create-specification.dto';

@Controller('/dishes')
export class DishController {
  constructor(private dishService: DishService) {}

  @Post()
  create(@Body() dto: CreateDishDto) {
    return this.dishService.create(dto);
  }

  @Post(':specification')
  createSpecification(@Body() dto: CreateSpecificationDto) {
    return this.dishService.createSpecification(dto);
  }

  @Get()
  getAll() {
    return this.dishService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: ObjectId) {
    return this.dishService.getOne(id);
  }

  @Delete(':id')
  delete(@Param('id') id: ObjectId) {
    return this.dishService.delete(id);
  }
}
