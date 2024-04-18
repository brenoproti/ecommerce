import { Injectable } from '@nestjs/common';
import { ShoppingCartDto } from './dto/shopping-cart.dto';
import { UpdateShoppingCartDto } from './dto/update-shopping-cart.dto';
import { ShoppingCart } from './entities/shopping-cart.entity';
import { ShoppingCartItem } from '../shopping-cart-items/entities/shopping-cart-item.entity';
import { ItemType } from '../common/constants/item-type.enum';
import { Combo } from '../combos/entities/combo.entity';
import { Service } from '../services/entities/service.entity';
import { Product } from '../products/entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ShoppingCartsService {
  constructor(
    @InjectRepository(ShoppingCart)
    private readonly shoppingCartRepository: Repository<ShoppingCart>,
  ) {
  }

  create(createShoppingCartDto: ShoppingCartDto, user) {
    const entity: ShoppingCart = new ShoppingCart();
    entity.user = user;

    const items: ShoppingCartItem[] = [];

    createShoppingCartDto.items.forEach(it => {
      const item: ShoppingCartItem = new ShoppingCartItem();
      item.itemType = it.type;
      if (it.type == ItemType.COMBO) {
        const combo: Combo = new Combo();
        combo.id = it.comboId;
        item.combo = combo;
      }

      if (it.type == ItemType.SERVICE) {
        const service: Service = new Service();
        service.id = it.serviceId;
        item.service = service;
      }

      if (it.type == ItemType.PRODUCT) {
        const product: Product = new Product();
        product.id = it.productId;
        item.product = product;
        item.quantity = it.quantity;
      }

      items.push(item);
    });

    entity.items = items;

    return this.shoppingCartRepository.save(entity);
  }
}
