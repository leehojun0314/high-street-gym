import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();
const JWT_SECRET = process.env.JWT_SECRET || '';
import prisma from '@/prisma/client';
export async function getUser(req: Request, res: Response) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    res.status(401).send('No token provided');
    return;
  }
  jwt.verify(token, JWT_SECRET, async (err, decoded) => {
    if (err) {
      res.status(401).send('Invalid token');
      return;
    }

    const decodedToken = decoded as {
      user_id: number;
      user_email: string;
      user_role: string;
      iat: number;
      exp: number;
    };
    console.log('decoded token: ', decodedToken);
    const user = await prisma.user
      .findFirstOrThrow({
        where: {
          user_id: decodedToken.user_id,
        },
      })
      .catch((err) => {
        console.log('erro: ', err);
        res.status(401).send('Invalid token');
      });
    if (!user) {
      res.status(401).send('Invalid token');
      return;
    }
    res.status(200).json(user);
  });
}
