import prisma from '@/prisma/client';
import { Request, Response } from 'express';

export default async function getPosts(req: Request, res: Response) {
  try {
    const blogs = await prisma.blog.findMany();
    console.log('blogs: ', blogs);
    res.status(200).json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
