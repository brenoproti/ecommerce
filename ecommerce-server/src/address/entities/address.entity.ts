import { AbstractEntity } from '../../common/entities/abastract.entity';
import { Column, Entity } from 'typeorm';
import { UF } from '../../common/constants/uf.enum';

@Entity({name: 'address'})
export class Address extends AbstractEntity {

  @Column({nullable: false})
  zipCode: string;

  @Column()
  neighborhood: string;

  @Column()
  city: string;

  @Column({ type: 'enum', enum: UF })
  state: UF;
}
