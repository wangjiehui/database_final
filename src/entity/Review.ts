import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Book } from "./Book";
import { Customer } from "./Customer";

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  book_id!: number;

  @Column()
  customer_id!: number;

  @Column("decimal", { precision: 3, scale: 2 })
  rating!: number;

  @Column("text")
  review_text!: string;

  @Column()
  review_date!: Date;
}