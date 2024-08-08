import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Book } from "./Book";
import { Customer } from "./Customer";

@Entity()
export class Sale {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  book_id!: number;

  @Column()
  customer_id!: number;

  @Column()
  quantity!: number;

  @Column()
  sale_date!: Date;

  @Column("decimal", { precision: 10, scale: 2 })
  total_amount!: number;
}