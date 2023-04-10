import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Drink, DrinkDocument } from './schema/drink.schema';
import { VineList, VineListDocument } from './schema/vinelist.schema';
import {CreateDrinkDto, UpdateDrinkDto} from './dto/create-drink.dto';
import { CreateVineListDto } from './dto/create-vinelist.dto';

@Injectable()
export class DrinkService {
  constructor(
    @InjectModel(Drink.name) private drinkModel: Model<DrinkDocument>,
    @InjectModel(VineList.name) private vineListModel: Model<VineListDocument>,
  ) {}

  async create(dto: CreateDrinkDto): Promise<Drink> {
    try {
      const vineListItem = await this.vineListModel.findById(dto.specification);
      const drink = await this.drinkModel.create({ ...dto});
      vineListItem.drinks.push(drink.id);
      await vineListItem.save();
      return drink;
    } catch (e) {
      console.log(e);
    }
  }
  async createVineList(dto: CreateVineListDto): Promise<VineList> {
    return await this.vineListModel.create({ ...dto });
  }
  async updateVineList(id: ObjectId, dto: CreateVineListDto): Promise<VineList> {
    return this.vineListModel.findByIdAndUpdate(id, dto, { new: true })
  }
  async getAll(): Promise<VineList[]> {
    return this.vineListModel.find().populate('drinks');
  }
  async getOne(id: ObjectId): Promise<Drink> {
    return this.drinkModel.findById(id);
  }
  async update(id: ObjectId, dto: UpdateDrinkDto): Promise<Drink> {
    return this.drinkModel.findByIdAndUpdate(id, dto, { new: true })
  }
  async delete(id: ObjectId, vineListID: string): Promise<Drink> {
    const drink = await this.drinkModel.findByIdAndDelete(id);
    const vineList = await this.vineListModel.findById(vineListID);
    vineList.drinks.splice(vineList.drinks.findIndex(objID => objID.toString() === drink.id), 1);
    await vineList.save();

    return drink.id
  }
}
