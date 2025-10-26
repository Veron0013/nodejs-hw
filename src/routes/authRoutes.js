import { celebrate } from "celebrate";
import { Router } from "express";
import {
	loginUser,
	logoutUser,
	refreshUserSession,
	registerUser,
	requestResetEmail,
	resetPassword
} from "../controllers/authController.js";
import {
	loginUserSchema,
	registerUserSchema,
	requestResetEmailSchema,
	resetPasswordSchema
} from "../validations/authValidation.js";


const router = Router();

router.post('/api/auth/register', celebrate(registerUserSchema), registerUser)
router.post('/api/auth/login', celebrate(loginUserSchema), loginUser)
router.post('/api/auth/logout', logoutUser)
router.post('/api/auth/refresh', refreshUserSession)

router.get('/api/auth/session', refreshUserSession)

router.post('/api/auth/request-reset-email', celebrate(requestResetEmailSchema), requestResetEmail)
router.post('/api/auth/reset-password', celebrate(resetPasswordSchema), resetPassword);

export default router;