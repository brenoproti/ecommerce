import { IsNotEmpty, Max, Min } from 'class-validator';
import { ItemType } from '../../common/constants/item-type.enum';

export class ShoppingCartItemDto {
  productId: number;
  comboId: number;
  serviceId: number;
  @IsNotEmpty()
  type: ItemType;
  @Min(1)
  @Max(5)
  quantity: number;
}
