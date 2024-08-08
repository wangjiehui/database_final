import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  name!: string;

  @Column({ length: 50 })
  genre!: string;

  @Column()
  total_books!: number;

  @Column()
  books_in_genre_last_x_years!: number;
}