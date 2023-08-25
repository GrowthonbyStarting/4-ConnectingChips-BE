import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';
import { Match } from '../../../libs/class-validator';
import { Gender } from '@prisma/client';
export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  nickname: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[A-Za-z\d]{10,20}$/, {
    message: '비밀번호는 문자열 및 숫자를 포함한 10자리 이상이여야 합니다.',
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  @Match('password', { message: '비밀번호가 일치하지 않습니다.' })
  confirmPassword: string;

  @IsNotEmpty()
  @IsString()
  birthDate: string;

  @IsNotEmpty()
  @IsString()
  gender?: Gender;

  yearAndMonthOfEmployment: string;
}

export class SignInDto {
  @IsNotEmpty()
  @IsString()
  nickname: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
