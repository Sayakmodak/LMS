import express from "express"
import { createCheckoutSession, stripeWebhook } from "../controllers/coursePurchaseController.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
const router = express.Router();

router.post("/checkout/create-checkout-session", isAuthenticated, createCheckoutSession);
router.post("/webhook", express.raw({ type: "application/json" }), stripeWebhook);


// router.get("/course/:courseId/detail-with-status",);
// router.get("/",);

export default router;