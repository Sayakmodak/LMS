import express from 'express';
import { isAuthenticated } from '../middlewares/isAuthenticated.js';
import { createCourse, getCreatorCourse } from '../controllers/courseController.js';

const router = express.Router();

router.post("/create-course", isAuthenticated, createCourse);
router.get("/", isAuthenticated, getCreatorCourse);

export default router;

// localhost:8080//api/auth/course/