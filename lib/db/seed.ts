    import { PrismaClient } from '@prisma/client';
    import { SERVICE_CATEGORIES } from '../constants';

    const prisma = new PrismaClient();

    async function main() {

    for (const category of SERVICE_CATEGORIES) {
        await prisma.serviceCategory.upsert({
        where: { id: category.id },
        update: {},
        create: {
            id: category.id,
            name: category.name,
            icon: category.icon,
        },
        });
    }

    
    const adminPassword = await import('bcryptjs').then(bcrypt => bcrypt.hash('admin123', 10));
    
    await prisma.user.upsert({
        where: { email: 'admin@mail.com' },
        update: {},
        create: {
        email: 'admin@mail.com',
        name: 'Admin User',
        password: adminPassword,
        role: 'ADMIN',
        },
    });

    console.log('Database seeded successfully!');
    }

    main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });