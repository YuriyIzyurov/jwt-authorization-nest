import {IsOptional} from "class-validator";

//todo: почему не работает не isoptional message
// :
// ["an unknown value was passed to the validate function"]
export class CreateReviewDto {
  @IsOptional()
  name: string;
  @IsOptional()
  rating: number;
  @IsOptional()
  text: string;
}
