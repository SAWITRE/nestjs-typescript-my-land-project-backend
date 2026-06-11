import { IsString, IsNumber, IsNotEmpty } from 'class-validator';
export class CreateLandDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsNumber()
  @IsNotEmpty()
  size!: number;

  @IsString()
  @IsNotEmpty()
  ownerName!: string;

  @IsNumber()
  @IsNotEmpty()
  coordinateX!: number;

  @IsNumber()
  @IsNotEmpty()
  coordinateY!: number;
}
