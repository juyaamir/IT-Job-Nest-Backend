import { registerUser } from "../controllers/userController.js";
import { Router } from "express";

const userRouter = Router();

userRouter.post('/register', registerUser);

export default userRouter;