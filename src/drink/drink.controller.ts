import {BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, UseGuards} from '@nestjs/common';
import { ObjectId } from 'mongoose';
import {CreateDrinkDto, UpdateDrinkDto} from './dto/create-drink.dto';
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

  @Put(':vinelist/:id')
  updateVinelist(@Param('id') id: ObjectId, @Body() dto) {
    return this.drinkService.updateVineList(id, dto);
  }

  @Get()
  getAll() {
    return this.drinkService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: ObjectId) {
    return this.drinkService.getOne(id);
  }

  @Put(':id')
  update(@Param('id') id: ObjectId, @Body() dto: UpdateDrinkDto) {
    return  this.drinkService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: ObjectId, @Body() vineList: {id: string}) {
    return this.drinkService.delete(id, vineList.id);
  }
}
