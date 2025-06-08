import express from 'express';
import { isAuthenticated } from '../middlewares/isAuthenticated.js';
import { createCourse, getCourseById, getCreatorCourse, updateCourse } from '../controllers/courseController.js';
import upload from '../utils/multer.js';
import { createLecture, getAllLectures } from '../controllers/lectureController.js';
const router = express.Router();

router.post("/create-course", isAuthenticated, createCourse);
router.get("/", isAuthenticated, getCreatorCourse);
router.put("/:courseId", isAuthenticated, upload.single("courseThumbnail"), updateCourse);
router.get("/:courseId", isAuthenticated, getCourseById);
router.post("/:courseId/lecture", isAuthenticated, createLecture);
router.get("/:courseId/lecture", isAuthenticated, getAllLectures);


export default router;



// http://localhost:8080/api/auth/course/684132a0649e569788cba058
// http://localhost:8080/api/auth/course/create-course