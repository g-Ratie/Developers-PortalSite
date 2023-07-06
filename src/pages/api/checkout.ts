import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const prisma = new PrismaClient();

  if (req.method === 'POST') {
    // Extract your data from the request body
    const { userDiscordId, checkOutTime } = req.body;

    const user = await prisma.users.findFirst({
      where: {
        user_discord_id: BigInt(userDiscordId),
      },
    });

    if (!user) {
      return res.status(404).json({ error: `No user found with Discord ID: ${userDiscordId}` });
    }

    const recentlyRecord = await prisma.daily_records.findFirst({
      where: {
        user_id: user.user_id,
        check_out: null,
      },
    });

    if (!recentlyRecord) {
      return res
        .status(404)
        .json({ error: `No check-in record found for user with Discord ID: ${userDiscordId}` });
    }
    const updatedRecord = await prisma.daily_records.update({
      where: {
        id: recentlyRecord?.id,
      },
      data: {
        check_out: new Date(checkOutTime),
      },
    });

    res.status(200).json(updatedRecord);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
