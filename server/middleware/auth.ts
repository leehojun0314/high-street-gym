import { NextFunction, Request, Response, Router } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '@/prisma/client';
import { TExtendedRequest } from '@/types';
import { config } from 'dotenv';
config();
export function auth(acceptedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log('auth req.headers: ', req.headers);
    const token = req.headers.authorization?.split(' ')[1];
    const JWT_SECRET = process.env.JWT_SECRET || '';

    if (!token) {
      res.status(401).send('No token provided');
      return;
    }
    try {
      console.log('auth token: ', token);
      console.log('auth JWT_SECRET: ', JWT_SECRET);
      jwt.verify(token, JWT_SECRET, async (err, decoded) => {
        if (err) {
          res.status(401).send('Invalid token');
          return;
        }
        const decodedToken = decoded as {
          user_id: number;
          user_email: string;
          user_role: string;
        };
        console.log('decodedToken: ', decodedToken);
        const user = await prisma.user.findFirstOrThrow({
          where: {
            user_id: decodedToken.user_id,
          },
        });
        (req as TExtendedRequest).user = user;
        if (acceptedRoles.includes(user.user_role)) {
          next();
        } else {
          res.status(401).send('Invalid role');
        }
      });
    } catch (error) {
      console.log('auth error: ', error);
      res.status(500).send('Error verifying token');
    }
  };
}
