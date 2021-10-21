import { IsNumber, IsNotEmpty,IsIn, IsEmail, IsBoolean, IsPositive } from 'class-validator';

export class OrderValidation {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  product_id: number;

  @IsNotEmpty()
  customer_name: string;

  @IsNotEmpty()
  customer_phone: string;

  @IsNotEmpty()
  @IsEmail()
  customer_email: string;

  @IsNotEmpty()
  customer_address: string;

  @IsNotEmpty()
  @IsIn(['transfer'])
  payment_type: string;
}