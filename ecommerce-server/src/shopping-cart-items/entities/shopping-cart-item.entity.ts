import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ShoppingCart } from '../../shopping-carts/entities/shopping-cart.entity';
import { Product } from '../../products/entities/product.entity';
import { Service } from '../../services/entities/service.entity';
import { Combo } from '../../combos/entities/combo.entity';
import { ItemType } from '../../common/constants/item-type.enum';

@Entity({name: 'shopping-cart-items'})
export class ShoppingCartItem {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'enum', enum: ItemType })
  itemType: ItemType;

  @Column({default: 1})
  quantity: number;

  @ManyToOne(() => ShoppingCart, shoppingCart => shoppingCart.items)
  @JoinColumn()
  shoppingCart: ShoppingCart;

  @ManyToOne(() => Product)
  @JoinColumn()
  product: Product;

  @ManyToOne(() => Service)
  @JoinColumn()
  service: Service;

  @ManyToOne(() => Combo)
  @JoinColumn()
  combo: Combo;

}