import express from 'express';
import { isAuthenticated } from '../middlewares/isAuthenticated.js';
import { createCourse } from '../controllers/courseController.js';

const router = express.Router();

router.post("/create-course", isAuthenticated, createCourse);

export default router;