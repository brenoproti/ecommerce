import { Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { AbstractEntity } from '../../common/entities/abastract.entity';
import { User } from '../../users/entities/user.entity';
import { ShoppingCartItem } from '../../shopping-cart-items/entities/shopping-cart-item.entity';

@Entity({name: 'shopping-cart'})
export class ShoppingCart extends AbstractEntity {
  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @OneToMany(() => ShoppingCartItem, item => item.shoppingCart, { cascade: ["insert", "update", "remove"] })
  items: ShoppingCartItem[];
}
