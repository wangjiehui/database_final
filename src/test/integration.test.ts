import { getRepository } from "typeorm";
import { Author } from "../entity/Author";

describe("Author Entity Integration Tests", () => {

    beforeAll(async () => {
        const authorRepository = getRepository(Author);
        await authorRepository.clear();
      });

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

  test("Read Author", async () => {
    const authorRepository = getRepository(Author);

    // Create
    const author = new Author();
    author.name = "George R.R. Martin";
    author.genre = "Fantasy";
    author.total_books = 10;
    author.books_in_genre_last_x_years = 3;
    await authorRepository.save(author);

    // Read
    const savedAuthor = await authorRepository.findOne({ where: { name: "George R.R. Martin" } });
    expect(savedAuthor).toBeDefined();
    expect(savedAuthor?.name).toBe("George R.R. Martin");
    expect(savedAuthor?.genre).toBe("Fantasy");
    expect(savedAuthor?.total_books).toBe(10);
    expect(savedAuthor?.books_in_genre_last_x_years).toBe(3);
  });

  test("Update Author", async () => {
    const authorRepository = getRepository(Author);

    // Create
    const author = new Author();
    author.name = "testupdate";
    author.genre = "Fantasy";
    author.total_books = 10;
    author.books_in_genre_last_x_years = 3;
    await authorRepository.save(author);

    // Update
    let savedAuthor = await authorRepository.findOne({ where: { name: "testupdate" } });
    if (savedAuthor) {
      savedAuthor.total_books = 12;
      await authorRepository.save(savedAuthor);
    }

    // Read Updated
    savedAuthor = await authorRepository.findOne({ where: { name: "testupdate" } });
    expect(savedAuthor).toBeDefined();
    expect(savedAuthor?.total_books).toBe(12);
  });

  test("Delete Author", async () => {
    const authorRepository = getRepository(Author);

    // Create
    const author = new Author();
    author.name = "J.R.R. Tolkien";
    author.genre = "Fantasy";
    author.total_books = 25;
    author.books_in_genre_last_x_years = 8;
    await authorRepository.save(author);

    // Delete
    let savedAuthor = await authorRepository.findOne({ where: { name: "J.R.R. Tolkien" } });
    if (savedAuthor) {
      await authorRepository.remove(savedAuthor);
    }

    // Read Deleted
    savedAuthor = await authorRepository.findOne({ where: { name: "J.R.R. Tolkien" } });
    expect(savedAuthor).toBeNull();
  });
});
