import prisma from '@/prisma/client';
import { getErrorMessage } from '@/utils/functions';
import { Request, Response } from 'express';

export default async function getActivities(req: Request, res: Response) {
  try {
    const result = await prisma.activity.findMany();
    console.log('result: ', result);
    res.status(200).json(result);
  } catch (error) {
    console.log('err: ', error);
    res.status(500).send(getErrorMessage(error));
  }
}
