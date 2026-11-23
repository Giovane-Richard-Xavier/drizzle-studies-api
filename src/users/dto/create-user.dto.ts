import { IsString, IsNotEmpty, IsInt } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsNotEmpty()
  @IsInt()
  age!: number;

  @IsString()
  @IsNotEmpty()
  email!: string;
}
