import {IsOptional} from "class-validator";


export class CreateReviewDto {
  @IsOptional()
  name: string;
  @IsOptional()
  rating: number;
  @IsOptional()
  text: string;
}
