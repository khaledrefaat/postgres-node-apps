import { Router } from 'express';
import { deleteBook, getBooks, postBook, downloadBooks } from './controller';

const router = Router();

router.get('/books/:page?/:term?', getBooks);

router.post('/new-book', postBook);

router.delete('/books/:id', deleteBook);

router.get('/download-books', downloadBooks);

export default router;
