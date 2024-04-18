import { Body, Controller, Post, Req } from '@nestjs/common';
import { ShoppingCartsService } from './shopping-carts.service';
import { ShoppingCartDto } from './dto/shopping-cart.dto';

@Controller('shopping-carts')
export class ShoppingCartsController {
  constructor(private readonly shoppingCartsService: ShoppingCartsService) {}

  @Post()
  create(@Body() shoppingCartDto: ShoppingCartDto, @Req() req) {
    return this.shoppingCartsService.create(shoppingCartDto, req.user);
  }
}
