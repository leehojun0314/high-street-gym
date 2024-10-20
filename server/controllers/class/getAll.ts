import prisma from '@/prisma/client';
import { getErrorMessage } from '@/utils/functions';
import { Request, Response } from 'express';

export default async function getAll(req: Request, res: Response) {
  try {
    const classes = await prisma.class.findMany();
    res.status(200).send(classes);
  } catch (error) {
    res.status(500).send(getErrorMessage(error));
  }
}
