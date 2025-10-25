import { Router } from "express";
import { getUser, updateUserAvatar } from "../controllers/userController.js";
import { upload } from "../middleware/multer.js";
import { authenticate } from "../middleware/authenticate.js";


const router = Router();

router.patch("/users/me/avatar", authenticate, upload.single("avatar"), updateUserAvatar)
router.get("/users/me", authenticate, getUser)

export default router
