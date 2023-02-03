import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Dish, DishDocument } from './schema/dish.schema';
import {
  Specification,
  SpecificationDocument,
} from './schema/specification.schema';
import { CreateDishDto } from './dto/create-dish.dto';
import { CreateSpecificationDto } from './dto/create-specification.dto';

@Injectable()
export class DishService {
  constructor(
    @InjectModel(Dish.name) private dishModel: Model<DishDocument>,
    @InjectModel(Specification.name)
    private specificationModel: Model<SpecificationDocument>,
  ) {}

  async create(dto: CreateDishDto): Promise<Dish> {
    const specification = await this.specificationModel.findById(
      dto.specification,
    );
    const dish = await this.dishModel.create({ ...dto, redactions: 0 });
    specification.dishes.push(dish.id);
    await specification.save();
    return dish;
  }
  async createSpecification(
    dto: CreateSpecificationDto,
  ): Promise<Specification> {
    return await this.specificationModel.create({ ...dto, redactions: 0 });
  }
  async getAll(): Promise<Specification[]> {
    return this.specificationModel.find().populate('dishes');
  }
  async getOne(id: ObjectId): Promise<Dish> {
    return this.dishModel.findById(id);
  }
  async delete(id: ObjectId): Promise<ObjectId> {
    const dish = await this.dishModel.findByIdAndDelete(id);
    return dish.id;
  }
}
