import getAll from '@/controllers/class/getAll';
import getOneClass from '@/controllers/class/getOne';
import createNewClass from '@/controllers/class/newClass';
import { auth } from '@/middleware/auth';
import { Router } from 'express';
export const classController = Router();

classController.get('/', getOneClass);
classController.get('/all', getAll);
classController.post('/new', auth(['ADMIN, TRAINER']), createNewClass);
