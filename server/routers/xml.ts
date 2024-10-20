import xmlController from '@/controllers/xml/xmlController';
import { Router } from 'express';
export const xmlRouter = Router();

xmlRouter.post('/upload', xmlController);
