import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  contents: string;

  @IsString()
  @IsOptional()
  image: string;
}
