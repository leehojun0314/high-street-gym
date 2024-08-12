import prisma from '@/prisma/client';
import { TExtendedRequest, TUser } from '@/types';
import { Response } from 'express';

export async function newBooking(req: TExtendedRequest, res: Response) {
  const { class_id } = req.body;
  const user = req.user! as TUser;
  if (!class_id) {
    return res.status(400).send('classId is required');
  }

  try {
    const booking = await prisma.booking.create({
      data: {
        booking_class_id: Number(class_id),
        booking_user_id: user.user_id,
      },
    });
    console.log('booking created: ', booking);
    res.status(201).send('Booking created successfully');
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).send('Internal Server Error');
  }
}
