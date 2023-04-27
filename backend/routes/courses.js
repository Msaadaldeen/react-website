import { Router } from 'express';
import { createCourse, deleteCourse, readcourse, readCourses, updateCourse } from '../controllers/CourseController.js';
import { isAdmin, isAuthenicated, isModerator } from '../middlewares/auth.js';
import { verifyToken } from '../utils/verifyToken.js';

const router = Router();

// CREATE - über HTTP Methode POST
router.post('/courses', isAdmin, createCourse);

// UPADTE
router.put('/courses/:id', isAdmin, updateCourse);

// DELETE
router.delete('/courses/:id', isAdmin, deleteCourse);

// READ ALL
router.get('/courses', readCourses);

// READ ONE
router.get('/courses/:id', readcourse);

export default router;
