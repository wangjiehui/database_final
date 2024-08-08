import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Author } from "./Author";

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  title!: string;

  @Column()
  author_id!: number;

  @Column({ length: 50 })
  genre!: string;

  @Column()
  published_date!: Date;

  @Column("decimal", { precision: 10, scale: 2 })
  price!: number;

  @Column("decimal", { precision: 3, scale: 2 })
  average_rating!: number;
}