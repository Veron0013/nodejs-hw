import { Router } from "express";
import { updateUserAvatar } from "../controllers/userController";
import { upload } from "../middleware/multer";
import { authenticate } from "../middleware/authenticate";


const router = Router();

router.patch("/user/me/avatar", authenticate, upload.single("avatar"), updateUserAvatar)

export default router
