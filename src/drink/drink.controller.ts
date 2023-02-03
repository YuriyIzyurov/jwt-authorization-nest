import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { CreateSpecificationDto } from '../dish/dto/create-specification.dto';
import { CreateDrinkDto } from './dto/create-drink.dto';
import { CreateVineListDto } from './dto/create-vinelist.dto';
import { DrinkService } from './drink.service';

@Controller('/drinks')
export class DrinkController {
  constructor(private drinkService: DrinkService) {}

  @Post()
  create(@Body() dto: CreateDrinkDto) {
    return this.drinkService.create(dto);
  }

  @Post(':vinelist')
  createSpecification(@Body() dto: CreateVineListDto) {
    return this.drinkService.createVineList(dto);
  }

  @Get()
  getAll() {
    return this.drinkService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: ObjectId) {
    return this.drinkService.getOne(id);
  }

  @Delete(':id')
  delete(@Param('id') id: ObjectId) {
    return this.drinkService.delete(id);
  }
}
