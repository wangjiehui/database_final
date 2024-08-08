import "reflect-metadata";
import { createConnection, getConnection, getRepository } from "typeorm";
import { Author } from "../entity/Author";
import { Book } from "../entity/Book";
import { Customer } from "../entity/Customer";
import { Review } from "../entity/Review";
import { Sale } from "../entity/Sale";

describe("Database Schema", () => {


  beforeAll(async () => {
    const authorRepository = getRepository(Author);
    await authorRepository.clear();
    const bookRepository = getRepository(Book);
    await bookRepository.clear();
    const customerRepository = getRepository(Customer);
    await customerRepository.clear();
    const reviewRepository = getRepository(Review);
    await reviewRepository.clear();
  });


  //Create
  test("Create Author", async () => {
    const authorRepository = getRepository(Author);

    // Create
    const author = new Author();
    author.name = "J.K. Rowling";
    author.genre = "Fantasy";
    author.total_books = 15;
    author.books_in_genre_last_x_years = 5;
    await authorRepository.save(author);

    // Read
    const savedAuthor = await authorRepository.findOne({ where: { name: "J.K. Rowling" } });
    expect(savedAuthor).toBeDefined();
    expect(savedAuthor?.name).toBe("J.K. Rowling");
    expect(savedAuthor?.genre).toBe("Fantasy");
    expect(savedAuthor?.total_books).toBe(15);
    expect(savedAuthor?.books_in_genre_last_x_years).toBe(5);
  });

  //Read
  test("Read Book", async () => {
    const bookRepository = getRepository(Book);

    // Create
    const book = new Book();
    book.title = "book1";
    book.author_id = 1;
    book.genre = "test";
    book.price = 99;
    book.average_rating = 1;
    book.published_date = new Date();
    await bookRepository.save(book);

    // Read
    const savedBook = await bookRepository.findOne({ where: { title: "book1" } });
    expect(savedBook).toBeDefined();
    expect(savedBook?.title).toBe("book1");
    expect(savedBook?.genre).toBe("test");
  });

  //Update
  test("Update Customer", async () => {
    const customerRepository = getRepository(Customer);

    // Create
    const customer = new Customer();
    customer.name = "test1";
    customer.total_spent_last_year = 1;
    await customerRepository.save(customer);

    // Update
    let savedCustomer = await customerRepository.findOne({ where: { name: "test1" } });
    if (savedCustomer) {
      savedCustomer.name = "test2";
      await customerRepository.save(savedCustomer);
    }

    // Read Updated
    savedCustomer = await customerRepository.findOne({ where: { name: "test2" } });
    expect(savedCustomer).toBeDefined();
    expect(savedCustomer?.name).toBe("test2");
  });

  //Delete
  test("Delete Review", async () => {
    const reviewRepository = getRepository(Review);

    // Create
    const review = new Review();
    review.book_id = 1;
    review.customer_id = 1;
    review.rating = 1;
    review.review_text = "text";
    review.review_date = new Date();
    await reviewRepository.save(review);

    // Delete
    let savedReview = await reviewRepository.findOne({ where: { review_text: "text" } });
    if (savedReview) {
      await reviewRepository.remove(savedReview);
    }

    // Read Deleted
    savedReview = await reviewRepository.findOne({ where: { review_text: "text" } });
    expect(savedReview).toBeNull();
  });
});
