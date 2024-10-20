import prisma from '@/prisma/client';
import { getErrorMessage } from '@/utils/functions';
import { Request, Response } from 'express';

export default async function deleteBooking(req: Request, res: Response) {
  const { id } = req.params;
  console.log('delete booking id:', id);
  try {
    await prisma.booking.delete({
      where: {
        booking_id: !isNaN(parseInt(id)) ? parseInt(id) : undefined,
      },
    });
    res.send('delete booking id: ' + id);
  } catch (error) {
    console.log('err:', error);
    res.status(500).send(getErrorMessage(error));
  }
}
