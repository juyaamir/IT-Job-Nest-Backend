import { registerUser, loginUser, deleteUser, updateUser, getProfile } from "../controllers/userController.js";
import { Router } from "express";
import { verifyToken } from "../middlewares/authMiddleWare.js";
import { get } from "mongoose";

const userRouter = Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.delete('/delete', deleteUser);
userRouter.put('/edit', updateUser);
userRouter.get('/profile', verifyToken, getProfile);    

export default userRouter;