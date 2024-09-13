import { IsNumber, IsString, IsEmail, IsOptional } from 'class-validator';

export class CreateProfileDto {
  @IsNumber()
  userId: number;

  @IsOptional()
  @IsString()
  username?: string;

  @IsEmail()
  email: string;

  @IsString()
  gender: string;

  @IsString()
  address: string;

  @IsString()
  pincode: string;

  @IsString()
  city: string;

  @IsString()
  state: string;

  @IsString()
  country: string;
}
