import { Router } from 'express';
import { createPost, deletePost, readPost, readPosts, updatePost } from '../controllers/PostController.js';
import { verifyToken } from '../utils/verifyToken.js';

const router = Router();

// CREATE - über HTTP Methode POST
router.post('/posts', verifyToken, createPost);

// UPADTE
router.put('/posts/:id', verifyToken, updatePost);

// DELETE
router.delete('/posts/:id', verifyToken, deletePost);

// READ ALL
router.get('/posts', readPosts);

// READ ONE
router.get('/posts/:id', readPost);

export default router;
