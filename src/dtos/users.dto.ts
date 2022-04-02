import { IsString, IsEmail, IsEnum, Contains, Matches } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  public email: string;


  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/)
  public password: string;

  @IsString()
  public name: string;

  @IsEnum(['admin', 'user'])
  public role: string;
}

export class LoginUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}
