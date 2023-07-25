import { PrismaClient } from '@prisma/client';

export const dailyRecordRepo = {
  getDailyRecordsAll: async () => {
    const prisma = new PrismaClient();
    const dailyRecords = await prisma.daily_records.findMany({
      include: {
        users: true,
      },
    });
    return dailyRecords;
  },
  getDailyRecordsByUserId: async (userId: number) => {
    const prisma = new PrismaClient();
    const dailyRecords = await prisma.daily_records.findMany({
      where: {
        user_id: userId,
      },
    });
    return dailyRecords;
  },
  
};
