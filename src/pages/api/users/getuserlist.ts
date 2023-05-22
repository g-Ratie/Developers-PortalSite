import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const prisma = new PrismaClient();
  const nowTime = Date.now();
  const users = await prisma.users.findMany({
    include: {
      daily_records: true,
    },
  });

  const result = users.map((user) => {
    const sortedRecords = user.daily_records.sort(
      (a, b) => b.check_in.getTime() - a.check_in.getTime()
    );
    const latestRecord = sortedRecords[0];
    const total = sortedRecords.reduce((sum, record) => {
      const outTime = record.check_out || nowTime;
      const timeDiff = Math.round((outTime - record.check_in.getTime()) / (1000 * 60 * 60));
      return sum + timeDiff;
    }, 0);

    return {
      user: user.user_name,
      value: latestRecord ? latestRecord.check_in : null,
      total,
    };
  });

  result.sort((a, b) => {
    if (a.value === null) {
      return 1;
    } else if (b.value === null) {
      return -1;
    } else {
      return b.value.getTime() - a.value.getTime();
    }
  });

  res.status(200).json(result);
}
