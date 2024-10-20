import prisma from '@/prisma/client';
import { Request, Response } from 'express';

export default async function createNewClass(req: Request, res: Response) {
  console.log('create class params: ', req.body);
  const newClass = await prisma.class.create({
    data: req.body,
  });
  res.status(201).send(newClass);
}
