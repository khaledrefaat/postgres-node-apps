import { Router } from 'express';
import {
  deleteBook,
  getBooks,
  postBook,
  downloadBooks,
  getGenres,
  getGenre,
  getBook,
  updateBook,
  getAuthor,
  getAuthors,
} from './controller';

const router = Router();

router.get('/books/:page?/:term?', getBooks);

router.post('/new-book', postBook);

router.put('/edit-book/:id', updateBook);

router.delete('/books/:id', deleteBook);

router.get('/download-books', downloadBooks);

router.get('/get-genres', getGenres);

router.get('/get-genre/:genre', getGenre);

router.get('/book/details/:id', getBook);

router.get('/get-author/:name', getAuthor);

router.get('/get-authors', getAuthors);

export default router;
