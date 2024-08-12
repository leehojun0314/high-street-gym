import prisma from '@/prisma/client';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { config } from 'dotenv';
config();
const JWT_SECRET = process.env.JWT_SECRET || '';
export async function loginUser(req: Request, res: Response) {
  const { email, password } = req.body;
  console.log('email: ', email);
  console.log('password: ', password);
  let isMatch: boolean = false;
  let user;
  try {
    user = await prisma.user.findFirstOrThrow({
      where: {
        user_email: email,
      },
    });
    isMatch = bcrypt.compareSync(password, user.user_password);
  } catch (error) {
    console.log('fetch user error: ', error);
    res.status(401).send('Invalid credentials');
    return;
  }

  if (isMatch) {
    // JWT 토큰 생성
    const token = jwt.sign(
      {
        user_id: user.user_id,
        user_email: user.user_email,
        user_role: user.user_role,
      },
      JWT_SECRET,
      { expiresIn: '1h' }, // 토큰 유효기간 1시간
    );
    res.status(200).send({ token, user });
  } else {
    res.status(401).send('Invalid credentials');
  }
}
