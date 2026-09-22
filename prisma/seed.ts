import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    throw new Error('DATABASE_URL is not set');
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main(): Promise<void> {
    await prisma.profile.deleteMany();

    await prisma.profile.create({
        data: {
            name: 'Karen Ghalachyan',
            description:
                'Backend Software Engineer with 3+ years of experience specializing in Node.js, TypeScript, payment systems, APIs and database-driven applications.',
            githubUrl: 'https://github.com/Karen1704',
            linkedinUrl: 'https://www.linkedin.com/in/karen-ghalachyan-15057118a/',
            skills: {
                create: [
                    { name: 'TypeScript' },
                    { name: 'JavaScript' },
                    { name: 'Node.js' },
                    { name: 'NestJS' },
                    { name: 'Express.js' },
                    { name: 'REST API' },
                    { name: 'GraphQL' },
                    { name: 'PostgreSQL' },
                    { name: 'MySQL' },
                    { name: 'Redis' },
                    { name: 'Prisma' },
                    { name: 'Docker' },
                    { name: 'Git' },
                    { name: 'Payment Systems' },
                    { name: 'Third-Party API Integration' },
                    { name: 'E-commerce' },
                    { name: 'Blockchain' },
                    { name: 'TON' },
                ],
            },
            experience: {
                create: [
                    {
                        company: 'Hydralab LLC',
                        position: 'Software Engineer',
                        period: 'Current',
                        achievements: [
                            'Developed and maintained backend applications with Node.js and TypeScript.',
                            'Built REST APIs using NestJS and Express.js.',
                            'Worked with PostgreSQL, MySQL and Redis.',
                            'Integrated third-party APIs and payment providers.',
                            'Developed payment-system functionality for deposits, withdrawals, callbacks and transaction status management.',
                            'Worked on e-commerce and blockchain-related applications.',
                            'Designed and optimized relational database structures.',
                            'Used Docker and Git in day-to-day development workflows.',
                        ],
                    },
                    {
                        company: 'Self-Employed',
                        position: 'Software Developer',
                        period: 'Independent projects',
                        achievements: [
                            'Developed backend services for websites and business applications.',
                            'Built e-commerce functionality and third-party integrations.',
                            'Worked independently with clients and project requirements.',
                        ],
                    },
                ],
            },
            projects: {
                create: [
                    {
                        name: 'Payment Back-Office System',
                        url: null,
                        description:
                            'Backend system for managing payment operations, payment-method configuration, transaction statuses, account priority, limits, reservations and approval flows.',
                    },
                    {
                        name: 'TON / Blockchain Integrations',
                        url: null,
                        description:
                            'Backend functionality involving wallet integrations, blockchain transactions, transfers, crypto payment flows, smart-contract interaction and third-party blockchain APIs.',
                    },
                    {
                        name: 'E-commerce / Business Applications',
                        url: null,
                        description:
                            'Business and e-commerce applications involving backend APIs, databases and third-party integrations.',
                    },
                ],
            },
        },
    });
}

try {
    await main();
    console.log('Database seeded successfully.');
} catch (error) {
    console.error('Database seeding failed.');
    console.error(error);
    process.exitCode = 1;
} finally {
    await prisma.$disconnect();
}