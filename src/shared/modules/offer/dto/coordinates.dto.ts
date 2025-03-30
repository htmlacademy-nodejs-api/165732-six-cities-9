import { IsLatitude, IsLongitude, IsNumber, IsNotEmpty } from 'class-validator';

export class CoordinatesDto {
  @IsNumber()
  @IsNotEmpty()
  @IsLatitude()
    latitude: number;

  @IsNumber()
  @IsNotEmpty()
  @IsLongitude()
    longitude: number;
}
