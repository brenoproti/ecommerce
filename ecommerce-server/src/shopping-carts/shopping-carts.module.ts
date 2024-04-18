import { Module } from '@nestjs/common';
import { ShoppingCartsService } from './shopping-carts.service';
import { ShoppingCartsController } from './shopping-carts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShoppingCart } from './entities/shopping-cart.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ShoppingCart])],
  controllers: [ShoppingCartsController],
  providers: [ShoppingCartsService],
})
export class ShoppingCartsModule {}
