import { IsNotEmpty } from 'class-validator';
import { ShoppingCartItemDto } from '../../shopping-cart-items/dto/shopping-cart-item.dto';

export class ShoppingCartDto {
  @IsNotEmpty()
  items: ShoppingCartItemDto[];
}
