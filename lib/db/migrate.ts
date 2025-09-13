    import { PrismaClient } from '@prisma/client';

    const prisma = new PrismaClient();

    async function main() {
    // Run migrations
    await prisma.$executeRaw`SELECT 1`;
    console.log('Database is ready!');
    }

    main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });