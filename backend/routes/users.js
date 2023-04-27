import { Router } from 'express';

import {
  addCourseToUser,
  deleteUser,
  readAllUsers,
  readUser,
  getUserCourses,
  getUserPosts,
  setAdmin,
  setModerator,
  updateUser,
  getUsersPosts,
} from '../controllers/UserController.js';
import { verifyToken, verifyTokenAndAuthorization } from '../utils/verifyToken.js';

const router = Router();

// UPADTE
router.put('/users/:id', verifyToken, updateUser);

//PATCH
router.patch('/users/:id/enroll', verifyToken, addCourseToUser);

router.patch('/users/:id/set-moderator', verifyToken, setModerator);

router.patch('/users/:id/set-admin', verifyToken, setAdmin);

// DELETE
router.delete('/users/:id', deleteUser);

// READ ONE
router.get('/users/:id', readUser);

// READ ALL
router.get('/users', readAllUsers);

// GET USER'S COURSES
router.get('/users/:id/courses', verifyToken, getUserCourses);

// GET USER'S POSTS
router.get('/users/:id/posts', verifyToken, getUserPosts);

router.get('/users/:id/posts/all', getUsersPosts);

export default router;
