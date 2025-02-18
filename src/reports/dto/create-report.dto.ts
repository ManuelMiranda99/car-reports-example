import {
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsString,
  Min,
  Max,
} from 'class-validator';

export class CreateReportDto {
  @Min(0)
  @Max(1000000)
  @IsNumber()
  price: number;

  @IsString()
  make: string;

  @IsString()
  model: string;

  @Min(1930)
  @Max(2050)
  @IsNumber()
  year: number;

  @IsLongitude()
  lng: number;

  @IsLatitude()
  lat: number;

  @Min(0)
  @Max(1000000)
  @IsNumber()
  mileage: number;
}
