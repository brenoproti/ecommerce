import { AbstractEntity } from "src/common/entities/abastract.entity";
import { Column, Entity } from "typeorm";

@Entity({name: 'services'})
export class Service extends AbstractEntity {
    @Column({nullable: false})
    name: string;
  
    @Column()
    description: string;
  
    @Column({nullable: false, type: 'decimal', precision: 10, scale: 2})
    price: number;
}
