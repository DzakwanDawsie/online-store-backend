import { IsNumber, IsNotEmpty,IsIn, IsEmail, IsBoolean, IsPositive } from 'class-validator';

export class OrderVerifyValidation {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  id: number;

  @IsNotEmpty()
  @IsIn(['valid','invalid'])
  validity: string;
}