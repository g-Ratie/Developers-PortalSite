import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
async function dbTest() {
  const users = await prisma.users.findMany();
  const dailyrecord = await prisma.daily_records.findMany();
  console.log(users);
  console.log(dailyrecord);
}
dbTest();