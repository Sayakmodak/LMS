import express from 'express';
import { register, login, getUserProfile, logOut } from "../controllers/userController.js";
import { isAuthenticated } from '../middlewares/isAuthenticated.js';

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logOut);
router.get("/profile", isAuthenticated, getUserProfile);

export default router;