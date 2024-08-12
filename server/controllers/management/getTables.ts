import prisma from '@/prisma/client';
import { TExtendedRequest, TTable } from '@/types';
import { getErrorMessage } from '@/utils/functions';
import { Response } from 'express';

export async function getTables(req: TExtendedRequest, res: Response) {
  try {
    const user = req.user;
    let { currentTable } = req.query as {
      currentTable: TTable;
    };
    if (!currentTable) {
      currentTable = 'class';
    }
    if (user?.user_role === 'ADMIN') {
      const tables = ['activity', 'class', 'location', 'blog', 'user'];
      const fields = prisma[currentTable].fields;
      console.log('fields: ', fields);
      res.status(200).send({ tables, fields });
    } else if (user?.user_role === 'TRAINER') {
      const tables = ['class', 'activity'];
      res.status(200).send({ tables });
    } else {
      res.status(401).send('Unauthorized');
    }
  } catch (error) {
    console.log('get tables error: ', error);
    res.status(500).send(getErrorMessage(error));
  }
}
