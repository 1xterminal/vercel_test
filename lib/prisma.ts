import { PrismaClient } from '../generated/client/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import path from 'path';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
    globalForPrisma.prisma ||
    (() => {
        let connectionString = process.env.DATABASE_URL || 'file:./dev.db';

        if (connectionString.startsWith('file:./')) {
            const dbPath = path.join(process.cwd(), connectionString.slice(7));
            connectionString = `file:${dbPath}`;
        }

        const adapter = new PrismaBetterSqlite3({ url: connectionString });

        return new PrismaClient({
            adapter,
            log: ['query'],
        });
    })();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
