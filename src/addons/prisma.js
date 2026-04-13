export function getConfig({ stackName }) {
  // Prisma is strictly for backend environments in this context
  if (stackName !== 'node') {
    return {};
  }

  const dependencies = {
    '@prisma/client': '^5.10.0',
  };

  const devDependencies = {
    'prisma': '^5.10.0',
  };

  const scripts = {
    "db:push": "prisma db push",
    "db:studio": "prisma studio",
    "db:generate": "prisma generate"
  };

  const configFiles = {
    'prisma/schema.prisma': `generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = "file:./dev.db" // Using SQLite for zero-config starting point
}

model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
}`,

    // Auto-setup the Prisma Client singleton to prevent dev-mode connection leaking
    'src/db.js': `import { PrismaClient } from '@prisma/client';

// Prevent multiple instances of Prisma Client in development
const globalForPrisma = globalThis;
export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
`
  };

  return { dependencies, devDependencies, scripts, configFiles };
}
