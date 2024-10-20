import createPost from '@/controllers/blog/createPost';
import deletePost from '@/controllers/blog/deletePost';
import getMyPosts from '@/controllers/blog/getMyPosts';
import getPost from '@/controllers/blog/getPost';
import getPosts from '@/controllers/blog/getPosts';
import { auth } from '@/middleware/auth';
import { Router } from 'express';

export const blogRouter = Router();

blogRouter.get('/posts', getPosts);
blogRouter.get('/my', auth(['ADMIN', 'TRAINER', 'MEMBER']), getMyPosts);
blogRouter.get('/view/:id', getPost);
blogRouter.post('/', auth(['ADMIN', 'TRAINER', 'MEMBER']), createPost);
blogRouter.delete('/', auth(['ADMIN', 'TRAINER', 'MEMBER']), deletePost);
