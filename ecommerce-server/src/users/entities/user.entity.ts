import { AbstractEntity } from '../../common/entities/abastract.entity';
import { BeforeInsert, Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Address } from '../../address/entities/address.entity';
import { hashSync } from 'bcrypt';

@Entity({name: 'users'})
export class User extends AbstractEntity {

  @Column({nullable: false})
  name: string;

  @Column({unique: true})
  document: string;

  @Column()
  age: number;

  @Column()
  password: string;

  @OneToOne(() => Address, { cascade: ["insert", "update", "remove"] })
  @JoinColumn()
  address: Address;

  @BeforeInsert()
  hashPassword() {
    this.password = hashSync(this.password, 10);
  }
}
