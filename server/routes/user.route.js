import express from 'express';
import { register, login, getUserProfile, logOut, updateProfile } from "../controllers/userController.js";
import { isAuthenticated } from '../middlewares/isAuthenticated.js';
import upload from '../utils/multer.js';


const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logOut);
router.get("/profile", isAuthenticated, getUserProfile);
router.put("/profile/update", isAuthenticated, upload.single("userImg"), updateProfile);


export default router;