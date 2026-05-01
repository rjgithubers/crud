import { Router } from "express";
import { signup, login, verifyEmail } from "@/controllers/auth.controller";
import { validate, signupValidationRules, loginValidationRules } from "@/middlewares/validation.middleware";

const router = Router();

router.post("/v1/signup", validate(signupValidationRules), signup);
router.post("/v1/login", validate(loginValidationRules), login);
router.get("/v1/verify-email", verifyEmail);

export default router;