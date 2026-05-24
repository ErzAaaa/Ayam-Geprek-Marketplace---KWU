require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const { createClient } = require('@libsql/client');
const { PrismaLibSql } = require('@prisma/adapter-libsql');

const libsql = createClient({ url: process.env.DATABASE_URL || 'file:./dev.db' });
const adapter = new PrismaLibSql(libsql);
const prisma = new PrismaClient({ adapter, datasourceUrl: process.env.DATABASE_URL || 'file:./dev.db' });

async function main() {
  const users = await prisma.user.findMany();
  console.log("Users via PrismaClient:", users);
}

main().finally(() => prisma.$disconnect());
