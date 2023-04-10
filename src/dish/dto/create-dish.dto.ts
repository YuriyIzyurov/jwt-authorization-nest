import {IsOptional} from "class-validator";

export class CreateDishDto {
  name: string;
  price: number;
  specification: string;
  @IsOptional()
  description: string;
}
export class UpdateDishDto {
  @IsOptional()
  name: string;
  @IsOptional()
  price: number;
}


