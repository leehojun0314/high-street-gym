import getActivities from '@/controllers/activity/getActivities';
import { Router } from 'express';
export const activityRouter = Router();

activityRouter.get('/', getActivities);
