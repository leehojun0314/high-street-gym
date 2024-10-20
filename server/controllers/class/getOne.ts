import prisma from '@/prisma/client';
import { getErrorMessage } from '@/utils/functions';
import { Request, Response } from 'express';

export default async function getOneClass(req: Request, res: Response) {
  const { location } = req.query;
  if (!location) {
    res.status(400).send('location and date are required');
    return;
  }
  console.log('location: ', location);
  try {
    const classes = await prisma.class.findMany({
      where: {
        class_location_id: Number(location),
      },
      include: {
        Location: true,
        Activity: true,
        User: {
          select: {
            user_firstname: true,
          },
        },
      },
    });
    res.status(200).send(classes);
  } catch (error) {
    console.log('get class error: ', error);
    res.status(500).send(getErrorMessage(error));
  }
}
