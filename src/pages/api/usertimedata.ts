import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

export interface DataObject {
  name: string;
  value: number;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const prisma = new PrismaClient();
  const usertimedata: DataObject[] = [];
  const nowtime = Date.now();
  const alldata = await prisma.daily_records.findMany({
    include: {
      users: true,
    },
  });
  alldata.forEach((data) => {
    const userName = data.users.user_name;
    const in_time = data.check_in;
    const out_time = data.check_out;
    if (usertimedata.some((data) => data.name === userName)) {
      const index = usertimedata.findIndex((data) => data.name === userName);
      if (out_time === null) {
        usertimedata[index].value += Math.round((nowtime - in_time.getTime()) / (1000 * 60 * 60));
      } else {
        usertimedata[index].value += Math.round(
          (out_time.getTime() - in_time.getTime()) / (1000 * 60 * 60)
        );
      }
    } else {
      if (out_time === null) {
        usertimedata.push({
          name: userName,
          value: Math.round((nowtime - in_time.getTime()) / (1000 * 60 * 60)),
        });
      } else {
        usertimedata.push({
          name: userName,
          value: Math.round((out_time.getTime() - in_time.getTime()) / (1000 * 60 * 60)),
        });
      }
    }
  });
  const sortedUserTimeData = usertimedata.sort((a, b) => b.value - a.value);
  res.status(200).json(sortedUserTimeData);
}
