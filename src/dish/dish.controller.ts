import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import { DishService } from './dish.service';
import {CreateDishDto, UpdateDishDto} from './dto/create-dish.dto';
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

  @Get(':specification/:id')
  getSpecification(@Param('id') id: ObjectId) {
    return this.dishService.getOneSpecification(id);
  }

  @Put(':specification/:id')
  updateSpecification(@Param('id') id: ObjectId, @Body() dto) {
    return this.dishService.updateSpecification(id, dto);
  }

  @Get()
  getAll() {
    return this.dishService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: ObjectId) {
    return this.dishService.getOne(id);
  }
  @Put(':id')
  update(@Param('id') id: ObjectId, @Body() dto: UpdateDishDto) {
    return this.dishService.update(id, dto)
  }

  @Delete(':id')
  delete(@Param('id') id: ObjectId, @Body() specification: {id: string}) {
    return this.dishService.delete(id, specification.id);
  }
}
