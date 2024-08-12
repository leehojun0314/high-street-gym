import { newBooking } from '@/controllers/booking/newBooking';
import { Router } from 'express';

export const bookingRouter = Router();

bookingRouter.post('/new', newBooking);
