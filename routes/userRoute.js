import { registerUser, loginUser, deleteUser, updateUser } from "../controllers/userController.js";
import { Router } from "express";

const userRouter = Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.delete('/delete', deleteUser);
userRouter.put('/edit', updateUser);

export default userRouter;