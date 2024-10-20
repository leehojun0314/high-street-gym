import prisma from '@/prisma/client';
import { TExtendedRequest } from '@/types';
import { Response } from 'express';

export default async function getMyPosts(req: TExtendedRequest, res: Response) {
  try {
    const user = req.user;
    console.log('user: ', user);
    const posts = await prisma.blog.findMany({
      where: {
        blog_user_id: Number(user?.user_id),
      },
    });
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
