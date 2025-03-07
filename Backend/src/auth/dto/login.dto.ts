import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter the correct email' })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string;
}
