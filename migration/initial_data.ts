import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedInitialData1680000000000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO Authors (id, name, genre, total_books, books_in_genre_last_x_years) VALUES
            (1, 'Author One', 'Fiction', 10, 3),
            (2, 'Author Two', 'Non-Fiction', 8, 2),
            (3, 'Author Three', 'Science Fiction', 15, 5);

            INSERT INTO Books (id, title, author_id, genre, published_date, price, average_rating) VALUES
            (1, 'Book One', 1, 'Fiction', '2023-01-01', 9.99, 4.5),
            (2, 'Book Two', 2, 'Non-Fiction', '2023-02-01', 12.99, 4.0),
            (3, 'Book Three', 3, 'Science Fiction', '2023-03-01', 14.99, 4.8);

            INSERT INTO Customers (id, name, total_spent_last_year) VALUES
            (1, 'Customer One', 100.00),
            (2, 'Customer Two', 150.00),
            (3, 'Customer Three', 200.00);

            INSERT INTO Reviews (id, book_id, customer_id, rating, review_text, review_date) VALUES
            (1, 1, 1, 4.5, 'Great book!', '2023-04-01'),
            (2, 2, 2, 4.0, 'Very informative.', '2023-05-01'),
            (3, 3, 3, 4.8, 'Excellent read.', '2023-06-01');

            INSERT INTO Sales (id, book_id, customer_id, quantity, sale_date, total_amount) VALUES
            (1, 1, 1, 1, '2023-07-01', 9.99),
            (2, 2, 2, 2, '2023-07-02', 25.98),
            (3, 3, 3, 3, '2023-07-03', 44.97);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM Sales WHERE id IN (1, 2, 3);
            DELETE FROM Reviews WHERE id IN (1, 2, 3);
            DELETE FROM Customers WHERE id IN (1, 2, 3);
            DELETE FROM Books WHERE id IN (1, 2, 3);
            DELETE FROM Authors WHERE id IN (1, 2, 3);
        `);
    }
}
