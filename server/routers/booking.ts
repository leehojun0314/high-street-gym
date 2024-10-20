import deleteBooking from '@/controllers/booking/deleteBooking';
import myBooking from '@/controllers/booking/myBooking';
import { newBooking } from '@/controllers/booking/newBooking';
import { Router } from 'express';

export const bookingRouter = Router();

bookingRouter.post('/new', newBooking);
bookingRouter.get('/my', myBooking);
bookingRouter.delete('/:id', deleteBooking);
