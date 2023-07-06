import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const prisma = new PrismaClient();
  const alldata = await prisma.daily_records.findMany({
    include: {
      users: true,
    },
    where: {
      check_out: null,
    },
  });
  const users = alldata.map((data) => data.users.user_name);
  const discord_id = alldata.map((data) => data.users.user_discord_id?.toString());
  const in_times = alldata.map((data) => data.check_in.toLocaleString());
  const result = users.map((user, index) => {
    return {
      name: user,
      discord_id: discord_id[index],
      value: in_times[index],
    };
  });
  res.status(200).json(result);
}
