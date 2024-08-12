import prisma from '@/prisma/client';

export type TTable =
	| 'activity'
	| 'class'
	| 'location'
	| 'blog'
	| 'user'
	| 'booking';
