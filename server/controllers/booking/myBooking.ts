import { TExtendedRequest } from '@/types';
import { Response } from 'express';
import prisma from '@/prisma/client';
export default async function myBooking(req: TExtendedRequest, res: Response) {
  const { user } = req;
  if (!user) {
    return res.status(401).json({
      error: 'You must be logged in to view your bookings',
    });
  }
  const { location } = req.query;
  console.log('location in my booking: ', location);
  const bookings = await prisma.booking.findMany({
    where: {
      booking_user_id: user.user_id,
      Class: {
        Location: {
          location_id:
            location && !isNaN(parseInt(location as string))
              ? parseInt(location as string)
              : undefined,
        },
      },
    },
    include: {
      Class: {
        include: {
          User: true,
          Location: true,
        },
      },
    },
  });
  console.log('bookings: ', bookings);
  return res.status(200).send(bookings);
}
