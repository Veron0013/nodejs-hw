import { Router } from "express";
import { getUser, updateUserProfile } from "../controllers/userController.js";
import { upload } from "../middleware/multer.js";
import { authenticate } from "../middleware/authenticate.js";


const router = Router();

router.patch("/api/users/me", authenticate, upload.single("avatar"), updateUserProfile)
router.get("/api/users/me", authenticate, getUser)

export default router
