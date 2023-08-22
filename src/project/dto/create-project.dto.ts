import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
const tabType = ['걷기', '조깅', '헬스', '자전거'];
type TabType = (typeof tabType)[number];

export class CreateProjectDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  type: TabType;

  @IsString()
  @IsNotEmpty()
  contents: string;

  @IsNotEmpty()
  @IsString()
  roles: string;

  @IsOptional()
  image: string;
}
