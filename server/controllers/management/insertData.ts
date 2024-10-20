import prisma from '@/prisma/client';
import { TExtendedRequest } from '@/types';
import { Response } from 'express';

export async function insertData(req: TExtendedRequest, res: Response) {
  try {
    const user = req.user;
    const { table } = req.params;
    const data = req.body;
    console.log('data:', data);
    console.log('insert endpoint logged in user: ', user);
    if (user?.user_role === 'TRAINER') {
      if (table !== 'class' && table !== 'activity') {
        res.status(401).send("You don't have permission to modify this table.");
        return;
      }
    }
    if (table in prisma) {
      await (prisma[table as keyof typeof prisma] as any).create({
        data: data,
      });
      res.status(200).send('Data created successfully');
    } else {
      res.status(400).send('Invalid table name');
    }
  } catch (error) {
    console.error('Error in upsertData:', error);
    res.status(500).send('An error occurred while processing your request');
  }
}
