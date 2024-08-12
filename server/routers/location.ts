import prisma from '@/prisma/client';
import { getErrorMessage } from '@/utils/functions';
import { Router } from 'express';

export const locationRouter = Router();

locationRouter.get('/all', async (req, res) => {
  try {
    const locations = await prisma.location.findMany();
    res.status(200).send(locations);
  } catch (error) {
    res.status(500).send(getErrorMessage(error));
  }
});
