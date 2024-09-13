import { IsNumber, IsString, IsEmail } from 'class-validator';

export class CreateProfileDto {
  @IsNumber()
  userId: number;

  @IsString()
  username: string;

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
