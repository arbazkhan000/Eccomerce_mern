import express from 'express';
import { UserController } from '../controller/userController';
import { protect } from '../middleware/middelware';

const router = express.Router();


router.post("/auth/register",UserController.create);
router.post("/auth/login",UserController.login);
router.get("/auth/profile", protect,UserController.profile);





export default router ;