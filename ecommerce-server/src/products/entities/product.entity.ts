import { AbstractEntity } from 'src/common/entities/abastract.entity';
import { Column, Entity } from 'typeorm';

@Entity({name: 'products'})
export class Product extends AbstractEntity {
  @Column({nullable: false})
  name: string;

  @Column()
  description: string;

  @Column({nullable: false, type: 'decimal', precision: 10, scale: 2})
  price: number;

  @Column()
  category: string;

  @Column({name: 'image_url', nullable: true})
  imageUrl: string;

  @Column({name: 'stock_quantity', nullable: false})
  stockQuantity: number;
}
