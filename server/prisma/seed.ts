import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [];

async function main() {
	console.log('start seeding...');
	for (const u of userData) {
		const user = await prisma.user.create({
			data: u,
		});
		console.log(`Created user with id: ${user.user_id}`);
	}
	console.log(`Seeding finished.`);
}

main()
	.then(() => {
		console.log('seed complete');
		return prisma.$disconnect();
	})
	.then(() => {
		console.log('prisma disconnected');
	})
	.catch((error) => {
		console.log('error occured: ', error);
	});
