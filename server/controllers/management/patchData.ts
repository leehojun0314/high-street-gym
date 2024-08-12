import prisma from '@/prisma/client';
import { TExtendedRequest } from '@/types';
import { Response } from 'express';
import bcrypt from 'bcryptjs';
import { getErrorMessage } from '@/utils/functions';
export async function patchData(req: TExtendedRequest, res: Response) {
  try {
    const user = req.user;
    const { table } = req.params;
    if (user?.user_role === 'TRAINER') {
      if (table !== 'class' && table !== 'activity') {
        res.status(401).send("You don't have permission to modify this table.");
        return;
      }
    }
    console.log('patch body: ', req.body);
    switch (table) {
      case 'class': {
        const { class_id, ...data } = req.body;
        console.log('data: ', data);
        await prisma.class.update({
          where: {
            class_id,
          },
          data: data,
        });
        break;
      }
      case 'booking': {
        const { booking_id, ...data } = req.body;
        await prisma.booking.update({
          where: {
            booking_id,
          },
          data: data,
        });
        break;
      }
      case 'location': {
        const { location_id, ...data } = req.body;
        await prisma.location.update({
          where: { location_id },
          data: data,
        });
        break;
      }
      case 'activity': {
        const { activity_id, ...data } = req.body;
        await prisma.activity.update({
          where: { activity_id },
          data,
        });
        break;
      }
      case 'user': {
        const { user_id, ...data } = req.body;
        let password;

        if ((data.user_password as string).startsWith('$2b$')) {
          password = data.user_password;
        } else {
          password = await bcrypt.hash(data.user_password, 10);
        }
        await prisma.user.update({
          where: { user_id },
          data: {
            ...data,
            user_password: password,
          },
        });
        break;
      }
      case 'blog': {
        const { blog_id, ...data } = req.body;
        await prisma.blog.update({
          where: { blog_id },
          data,
        });
        break;
      }
      default: {
        res.status(400).send('Invalid table name given');
        return;
      }
    }
    res.status(200).send('Data updated successfully.');
  } catch (error) {
    console.log('data update error: ', error);
    res.status(500).send(getErrorMessage(error));
  }
}
