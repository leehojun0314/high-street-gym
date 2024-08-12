import { auth } from '@/middleware/auth';
import prisma from '@/prisma/client';
import { EWeek } from '@/types';
import { getErrorMessage } from '@/utils/functions';
import { Router } from 'express';
export const classController = Router();

classController.get('/', async (req, res) => {
  const { location, date } = req.query;
  if (!location || !date) {
    res.status(400).send('location and date are required');
    return;
  }
  try {
    console.log('location: ', location);
    console.log('date: ', date);
    const classes = await prisma.class.findMany({
      where: {
        class_location_id: Number(location),
        class_datetime: {
          gte: new Date(date as string),
        },
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
});
classController.get('/all', async (req, res) => {
  try {
    const classes = await prisma.class.findMany();
    res.status(200).send(classes);
  } catch (error) {
    res.status(500).send(getErrorMessage(error));
  }
});
classController.post('/new', auth(['ADMIN, TRAINER']), async (req, res) => {
  console.log('create class params: ', req.body);
  const newClass = await prisma.class.create({
    data: req.body,
  });
  res.status(201).send(newClass);
  // const newClass = await prisma.class.create({
  // 	data: {

  // 		description,
  // 		price,
  // 		startDate,
  // 		endDate,
  // 		user: {
  // 			connect: {
  // 				user_id: req.user.user_id,
  // 			},
  // 		},
  // 	},
  // });
  // res.status(200).json(newClass);
});
