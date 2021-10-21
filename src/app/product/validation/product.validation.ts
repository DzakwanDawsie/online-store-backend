import { IsNumber, IsNotEmpty, IsBoolean, IsPositive } from 'class-validator';

export class ProductValidation {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  price: number;

  @IsNotEmpty()
  description: string;

  @IsBoolean()
  active: string;

  @IsNotEmpty()
  @IsNumber()
  stock: number;
}