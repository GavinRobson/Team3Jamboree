import { PrismaClient } from '@/prisma/client';

let db;

if (!global.db) {
  global.db = new PrismaClient();
}

db = global.db;

if (process.env.NODE_ENV !== 'production') {
  global.db = db;
}

module.export = { db }; 