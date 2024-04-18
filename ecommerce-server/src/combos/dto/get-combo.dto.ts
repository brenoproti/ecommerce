import { IsNotEmpty } from 'class-validator';

export class GetComboDto {
  @IsNotEmpty()
  name: string;
  description: string;
  @IsNotEmpty()
  price: number;
  id?: number;
  @IsNotEmpty()
  services: {id: number, name: string}[];
}
