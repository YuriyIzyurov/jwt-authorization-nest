import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Dish, DishDocument } from './schema/dish.schema';
import {
  Specification,
  SpecificationDocument,
} from './schema/specification.schema';
import {CreateDishDto, UpdateDishDto} from './dto/create-dish.dto';
import { CreateSpecificationDto } from './dto/create-specification.dto';
import {CreateDrinkDto} from "src/drink/dto/create-drink.dto";
import {Drink} from "src/drink/schema/drink.schema";

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
    const dish = await this.dishModel.create({ ...dto});
    specification.dishes.push(dish.id);
    await specification.save();
    return dish;
  }
  async createSpecification(
    dto: CreateSpecificationDto,
  ): Promise<Specification> {
    return await this.specificationModel.create({ ...dto });
  }

  async getOneSpecification(
      id: ObjectId,
  ): Promise<Specification> {
    return this.specificationModel.findById(id);
  }

  async updateSpecification(
      id: ObjectId, dto: CreateSpecificationDto
  ): Promise<Specification> {
    return this.specificationModel.findByIdAndUpdate(id, dto, { new: true });
  }

  async getAll(): Promise<Specification[]> {
    return this.specificationModel.find().populate('dishes');
  }

  async getOne(id: ObjectId): Promise<Dish> {
    return this.dishModel.findById(id);
  }

  async update(id: ObjectId, dto: UpdateDishDto): Promise<Dish> {
    return this.dishModel.findByIdAndUpdate(id, dto, { new: true })
  }

  async delete(id: ObjectId, specificationID: string): Promise<ObjectId> {
    const dish = await this.dishModel.findByIdAndDelete(id);
    const specification = await this.specificationModel.findById(specificationID);
    specification.dishes.splice(specification.dishes.findIndex(objID => objID.toString() === dish.id), 1);
    await specification.save();

    return dish.id;
  }
}
