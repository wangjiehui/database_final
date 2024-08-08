# SENG8071 Final

## Group 4

## Contribution Table
|     ID      |      Name     |      Responsibility     |
| ------------- |---------------|---------------|
| 8838253       | Vaishnavi Kotakal   | CRUD functions for every table   |
| 8905625         | Ravi Teja Matta  | unit tests for CRUD operation   |
| 8882871   | Jiehui Wang  | integration tests for CRUD operation & diagram   |

## Working database with Author table
```
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
```

