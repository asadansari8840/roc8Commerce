import {PrismaClient} from '@prisma/client';
import {faker} from '@faker-js/faker';

const prisma = new PrismaClient();

const generateCategories = async (count = 100) => {
    try {
        const categories = Array.from({length: count}).map(() => ({
            name: faker.commerce.productName(),
        }));

        // Inserting categories in bulk
        const result = await prisma.category.createMany({
            data: categories,
            skipDuplicates: true, // This ensures that if there are duplicate entries, they are skipped
        });

        console.log(`Inserted ${result.count} categories successfully.`);
    } catch (error) {
        console.error('Error inserting categories:', error);
    }
};

const main = async () => {
    console.log('Starting category seeding...');

    try {
        await generateCategories(100); // Insert 100 records
        console.log('Category seeding completed successfully.');
    } catch (error) {
        console.error('Error in seeding process:', error);
    } finally {
        await prisma.$disconnect();
        console.log('Disconnected from the database.');
    }
};

main();
