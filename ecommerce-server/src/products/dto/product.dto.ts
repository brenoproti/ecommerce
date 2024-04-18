import { IsNotEmpty } from 'class-validator';

export class ProductDto {
  @IsNotEmpty()
  name: string;
  description: string;
  @IsNotEmpty()
  price: number;
  category: string;
  imageUrl: string;
  @IsNotEmpty()
  stockQuantity: number;
  id?: number;
}
