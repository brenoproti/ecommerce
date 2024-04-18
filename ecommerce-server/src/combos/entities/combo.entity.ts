import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { AbstractEntity } from '../../common/entities/abastract.entity';
import { Service } from '../../services/entities/service.entity';

@Entity({name: 'combos'})
export class Combo extends AbstractEntity {
  @Column({nullable: false})
  name: string;

  @Column()
  description: string;

  @Column({nullable: false, type: 'decimal', precision: 10, scale: 2})
  price: number;

  @ManyToMany(() => Service, { cascade: ["remove"] })
  @JoinTable({ name: 'combo_services' })
  services: Service[];
}
