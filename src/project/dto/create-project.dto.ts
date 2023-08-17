import { IsOptional, IsString } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  title: string;

  @IsString()
  contents: string;

  @IsOptional()
  image: string;
}
