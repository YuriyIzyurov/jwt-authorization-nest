import { IsNotEmpty, IsString, Length } from 'class-validator';

export class AuthDto {
  @IsNotEmpty()
  @IsString()
  @Length(5, 20)
  readonly username: string;

  @IsNotEmpty()
  @IsString()
  @Length(5, 20)
  readonly password: string;
}
