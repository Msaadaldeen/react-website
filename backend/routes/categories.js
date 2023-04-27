import { Router } from 'express';
import {
  createCategory,
  deleteCategory,
  readCategories,
  readCategory,
  updateCategory,
} from '../controllers/CategoryController.js';
import { verifyToken, verifyTokenAndAuthorization } from '../utils/verifyToken.js';

const router = Router();

// CREATE - über HTTP Methode POST
router.post('/categories', verifyToken, createCategory);

// UPADTE
router.put('/categories/:id', verifyToken, updateCategory);

// DELETE
router.delete('/categories/:id', verifyToken, deleteCategory);

// READ ALL
router.get('/categories', readCategories);

// READ ONE
router.get('/categories/:id', readCategory);

export default router;
