import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import { Service } from '../../services/entities/service.entity';
import { Combo } from '../../combos/entities/combo.entity';
import { ItemType } from '../../common/constants/item-type.enum';
import { Purchase } from '../../purchases/entities/purchase.entity';

@Entity({name: 'purchase-items'})
export class PurchaseItem {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'enum', enum: ItemType })
  itemType: ItemType;

  @Column({nullable: false, type: 'decimal', precision: 10, scale: 2})
  price: number;

  @Column({default: 1})
  quantity: number;

  @ManyToOne(() => Purchase, purchase => purchase.items)
  @JoinColumn()
  purchase: Purchase;

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