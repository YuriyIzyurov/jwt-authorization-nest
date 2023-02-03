import { Type } from '@nestjs/class-transformer';
import { PriceType } from '../schema/drink.schema';

class Price {
  readonly ml50: number;
  readonly ml100: number;
  readonly bottle: number;
}

export class CreateDrinkDto {
  readonly name: string;
  readonly country: string;
  @Type(() => Price)
  readonly price: Price;
  readonly specification;
}
