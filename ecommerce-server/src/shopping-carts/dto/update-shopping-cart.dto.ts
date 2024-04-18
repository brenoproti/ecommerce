import { PartialType } from '@nestjs/mapped-types';
import { ShoppingCartDto } from './shopping-cart.dto';

export class UpdateShoppingCartDto extends PartialType(ShoppingCartDto) {}
