import express from 'express';
import { isAuthenticated } from '../middlewares/isAuthenticated.js';
import { createCourse, getAllPublishedCourse, getCourseById, getCreatorCourse, removeCourse, togglePublish, updateCourse } from '../controllers/courseController.js';
import upload from '../utils/multer.js';
import { createLecture, getAllLectures, getLectuteById, removeLecture, updateLecture } from '../controllers/lectureController.js';
const router = express.Router();

router.post("/create-course", isAuthenticated, createCourse);
router.get("/published-course", isAuthenticated, getAllPublishedCourse);
router.get("/", isAuthenticated, getCreatorCourse);
router.put("/:courseId", isAuthenticated, upload.single("courseThumbnail"), updateCourse);
router.get("/:courseId", isAuthenticated, getCourseById);
router.delete("/delete/:courseId", isAuthenticated, removeCourse);


// Lectures Route
router.post("/:courseId/lecture", isAuthenticated, createLecture);
router.get("/:courseId/lecture", isAuthenticated, getAllLectures);
router.post("/:courseId/lecture/:lectureId", isAuthenticated, updateLecture);
router.delete("/lecture/:lectureId", isAuthenticated, removeLecture);
router.get("/lecture/:lectureId", isAuthenticated, getLectuteById);
router.patch("/:courseId", isAuthenticated, togglePublish);


export default router;



// http://localhost:8080/api/auth/course/684132a0649e569788cba058
// http://localhost:8080/api/auth/course/create-course