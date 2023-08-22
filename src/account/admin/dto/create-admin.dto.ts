import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';
import { Match } from 'src/libs/class-validator';

export class CreateAdminDto {
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^(?=.*[a-z\d])(?=.*[!@#$%^&*()])[a-z\d!@#$%^&*()]{8,12}$/, {
    message:
      '비밀번호는 소문자, 특수문자 및 숫자를 모두 포함한 8자리 이상이여야 합니다.',
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  @Match('password', { message: '비밀번호가 일치하지 않습니다.' })
  confirmPassword: string;
}

export class SignInDto {
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
