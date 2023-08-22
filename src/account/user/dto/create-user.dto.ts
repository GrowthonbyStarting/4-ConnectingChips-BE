import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';
import { Match } from '../../../libs/class-validator';
import { Gender } from '@prisma/client';
export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  nickname: string;

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
