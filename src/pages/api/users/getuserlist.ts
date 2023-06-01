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
      const outTime = record.check_out?.getTime() || nowTime;
      const timeDiff = Math.round((outTime - record.check_in.getTime()) / (1000 * 60 * 60));
      return sum + timeDiff;
    }, 0);
    const str_user_discord_id = user.user_discord_id?.toString();
    return {
      name: user.user_name,
      latestRecord: latestRecord ? latestRecord.check_in : null,
      discord_id: str_user_discord_id,
      total,
    };
  });

  result.sort((a, b) => {
    if (a.latestRecord === null) {
      return 1;
    } else if (b.latestRecord === null) {
      return -1;
    } else {
      return b.latestRecord.getTime() - a.latestRecord.getTime();
    }
  });

  res.status(200).json(result);
}
