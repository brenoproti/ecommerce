import { AbstractEntity } from 'src/common/entities/abastract.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { PurchaseStatus } from '../../common/constants/purchase-status.enum';
import { PurchaseItem } from '../../purchase-items/entities/purchase-item.entity';

@Entity({ name: 'purchases' })
export class Purchase extends AbstractEntity {
  @ManyToOne(() => User)
  @JoinColumn()
  customer: User;

  @Column({ nullable: false, type: 'decimal', precision: 10, scale: 2 })
  totalAmount: number;

  @Column({ type: 'enum', enum: PurchaseStatus })
  status: PurchaseStatus;

  @OneToMany(() => PurchaseItem, item => item.purchase, { cascade: ['insert', 'update', 'remove'] })
  items: PurchaseItem[];
}
