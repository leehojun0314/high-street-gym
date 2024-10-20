import prisma from '@/prisma/client';
import { TExtendedRequest } from '@/types';
import { Request, Response } from 'express';

export default async function createPost(req: TExtendedRequest, res: Response) {
  console.log('create post called');
  console.log('user: ', req.user);
  try {
    const user = req.user;
    const { title, content } = req.body;
    const newPost = await prisma.blog.create({
      data: {
        blog_title: title,
        blog_content: content,
        blog_user_id: Number(user?.user_id),
        blog_datetime: new Date(),
      },
    });
    res.status(201).json(newPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
