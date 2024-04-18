import { Exclude } from "class-transformer";
import { CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export abstract class AbstractEntity {
  @PrimaryGeneratedColumn()
  @Exclude()
  public id: number;

  @CreateDateColumn({name: 'created_at'})
  @Exclude()
  createdAt: string;

  @UpdateDateColumn({name: 'updated_at'})
  @Exclude()
  updatedAt: string;

  @DeleteDateColumn({name: 'deleted_at'})
  @Exclude()
  deletedAt: Date;
}