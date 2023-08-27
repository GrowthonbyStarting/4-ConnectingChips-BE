import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';
import { Match } from 'src/libs/class-validator';

export class CreateAdminDto {
  @IsNotEmpty()
  @IsString()
  nickname: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[A-Za-z0-9]{10,12}$/, {
    message: '비밀번호는 문자 및 숫자를 모두 포함한 10자리 이상이여야 합니다.',
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  @Match('password', { message: '비밀번호가 일치하지 않습니다.' })
  confirmPassword: string;

  @IsNotEmpty()
  adminSignUpSecret: string;
}

export class SignInDto {
  @IsNotEmpty()
  @IsString()
  nickname: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
