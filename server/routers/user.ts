import express from 'express';
import { getUser } from '@/controllers/user/getUser';
import { loginUser } from '@/controllers/user/loginUser';
import { registerUser } from '@/controllers/user/registerUser';
export const userRouter = express.Router();

userRouter.get('/', getUser);
userRouter.post('/login', loginUser);
userRouter.post('/register', registerUser);
