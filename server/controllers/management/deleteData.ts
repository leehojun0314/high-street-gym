import prisma from '@/prisma/client';
import { TExtendedRequest } from '@/types';
import { Response } from 'express';

export async function deleteData(req: TExtendedRequest, res: Response) {
  try {
    const user = req.user;
    const { table, id } = req.params;
    if (user?.user_role === 'TRAINER') {
      if (table !== 'class' && table !== 'activity') {
        res.status(401).send("You don't have permission to modify this table.");
        return;
      }
    }
    if (table in prisma) {
      await (prisma[table as keyof typeof prisma] as any).delete({
        where: {
          [`${table}_id`]: Number(id),
        },
      });
      res.status(200).send('Data deleted successfully');
    } else {
      res.status(400).send('Invalid table name');
    }
  } catch (error) {
    console.error('Error in deleteData:', error);
    res.status(500).send('An error occurred while processing your request');
  }
}
