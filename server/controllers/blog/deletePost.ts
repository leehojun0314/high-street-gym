import prisma from '@/prisma/client';
import { TExtendedRequest } from '@/types';
import { Request, Response } from 'express';

export default async function deletePost(req: TExtendedRequest, res: Response) {
  const { id } = req.body;
  try {
    const post = await prisma.blog.delete({
      where: {
        blog_id: id,
        blog_user_id: req.user?.user_id,
      },
    });
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
}
