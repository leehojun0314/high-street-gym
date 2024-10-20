import prisma from '@/prisma/client';
import { getErrorMessage } from '@/utils/functions';
import { Request, Response } from 'express';

export default async function getPost(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const post = await prisma.blog.findUnique({
      where: {
        blog_id: Number(id),
      },
      include: {
        User: {
          select: {
            user_firstname: true,
            user_lastname: true,
          },
        },
      },
    });
    res.status(200).send(post);
  } catch (error) {
    res.status(500).send(getErrorMessage(error));
  }
}
