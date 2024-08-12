import { Router } from 'express';
import { userRouter } from './user';
import { classController } from './class';
import { locationRouter } from './location';
import { auth } from '@/middleware/auth';
import { managementRouter } from './management';
import { xmlController } from './xml';
import multer from 'multer';
import { bookingRouter } from './booking';

const router = Router();
const upload = multer();
router.use('/user', userRouter);
router.use('/class', classController);
router.use('/location', locationRouter);
router.use('/booking', auth(['ADMIN', 'TRAINER', 'MEMBER']), bookingRouter);
router.use('/management', auth(['ADMIN', 'TRAINER']), managementRouter);
router.use('/xml', auth(['ADMIN']), upload.single('file'), xmlController);
export default router;
