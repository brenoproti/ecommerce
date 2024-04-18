import { IsNotEmpty } from 'class-validator';

export class ComboDto {
  @IsNotEmpty()
  name: string;
  description: string;
  @IsNotEmpty()
  price: number;
  id?: number;
  @IsNotEmpty()
  serviceIds: number[];
}
