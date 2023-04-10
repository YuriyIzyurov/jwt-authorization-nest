import { Type } from '@nestjs/class-transformer';
import { PriceType } from '../schema/drink.schema';
import {IsOptional} from "class-validator";

class Price {
  ml50: number;
  ml100: number;
  bottle: number;
}

export class CreateDrinkDto {
  name: string;
  @IsOptional()
  @Type(() => Price)
  price: Price;
  specification: string;
}
export class UpdateDrinkDto {
  @IsOptional()
  name: string;
  @IsOptional()
  @Type(() => Price)
  price: Price;
}

