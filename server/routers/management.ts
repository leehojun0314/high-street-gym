import { deleteData, getTableDatas } from '@/controllers/management';
import { getTables, insertData, patchData } from '@/controllers/management';
import { auth } from '@/middleware/auth';
import { Router } from 'express';

export const managementRouter = Router();
managementRouter.use(auth(['ADMIN', 'TRAINER']));
managementRouter.get('/', getTableDatas);
managementRouter.get('/tables', getTables);
managementRouter.post('/new/:table', insertData);
managementRouter.patch('/:table', patchData);
managementRouter.delete('/:table/:id', deleteData);
