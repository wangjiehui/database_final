import express from 'express';
import { createConnection, getRepository } from 'typeorm';
import { Author } from './entity/Author';
import path from 'path';

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

createConnection().then(() => {
  console.log('Connected to the database');

  // CRUD API Routes
  // create
  app.post('/authors', async (req, res) => {
    try {
      const authorRepository = getRepository(Author);
      const author = authorRepository.create(req.body);
      const result = await authorRepository.save(author);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ message: 'Error creating author', error });
    }
  });

  //find one(read)
  app.get('/authors/:id', async (req, res) => {
    try {
      const authorRepository = getRepository(Author);
      const author = await authorRepository.findOne({
        where: { id: parseInt(req.params.id, 10) }
      });
      if (author) {
        res.status(200).json(author);
      } else {
        res.status(404).json({ message: 'Author not found' });
      }
    } catch (error) {
      res.status(400).json({ message: 'Error fetching author', error });
    }
  });
  
  //find list(read all)
  app.get('/authors', async (req, res) => {
    try {
      const authorRepository = getRepository(Author);
      const authors = await authorRepository.find();
      res.status(200).json(authors);
    } catch (error) {
      res.status(400).json({ message: 'Error fetching authors', error });
    }
  });
  
  //update
  app.put('/authors/:id', async (req, res) => {
    try {
      const authorRepository = getRepository(Author);
      const author = await authorRepository.findOne({
        where: { id: parseInt(req.params.id, 10) }
      });
      if (author) {
        authorRepository.merge(author, req.body);
        const result = await authorRepository.save(author);
        res.status(200).json(result);
      } else {
        res.status(404).json({ message: 'Author not found' });
      }
    } catch (error) {
      res.status(400).json({ message: 'Error updating author', error });
    }
  });

  //delete
  app.delete('/authors/:id', async (req, res) => {
    try {
      const authorRepository = getRepository(Author);
      const result = await authorRepository.delete({
        id: parseInt(req.params.id, 10)
      });
      if (result.affected) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: 'Author not found' });
      }
    } catch (error) {
      res.status(400).json({ message: 'Error deleting author', error });
    }
  });
  
  
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
