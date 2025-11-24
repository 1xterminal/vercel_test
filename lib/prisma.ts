import { PrismaClient } from '../generated/client/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import Database from 'better-sqlite3';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
    globalForPrisma.prisma ||
    (() => {
        // For SQLite, we need to strip "file:" if using better-sqlite3 directly,
        // but the adapter might handle it.
        // The guide says: const adapter = new PrismaBetterSqlite3({ url: connectionString });
        // Let's try that first.

        // However, typically better-sqlite3 takes a path.
        // If the guide says { url: ... }, it might be a specific API for the adapter.
        // Let's assume the guide is correct for Prisma 7.

        // Note: The guide shows:
        // const adapter = new PrismaBetterSqlite3({ url: connectionString });
        // const prisma = new PrismaClient({ adapter });

        const connectionString = process.env.DATABASE_URL || 'file:./dev.db';

        // If the adapter expects a URL string, we pass it.
        const adapter = new PrismaBetterSqlite3({ url: connectionString });

        return new PrismaClient({
            adapter,
            log: ['query'],
        });
    })();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
