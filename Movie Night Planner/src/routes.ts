import { Router } from 'express';
import {
  getMovie,
  getMovies,
  postMovie,
  editMovie,
  deleteMovie,
} from './controller';

const router = Router();

router.get('/', getMovies);
router.get('/:id', getMovie);

router.post('/', postMovie);
router.put('/:id', editMovie);
router.delete('/:id', deleteMovie);

export default router;
