// pages/api/checkin.ts
import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const prisma = new PrismaClient();

  if (req.method === 'POST') {
    // Extract your data from the request body
    const { userDiscordId, checkInTime, is4F } = req.body;

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
      },
    });
    //これのcheckoutがnull(=入室中のログがすでにある)ならエラーを返す
    if (recentlyRecord && recentlyRecord.check_out === null) {
      return res.status(400).json({ error: 'You are already checked in' });
    }

    // Add a new record to the daily_records table
    const newRecord = await prisma.daily_records.create({
      data: {
        user_id: user.user_id,
        check_in: new Date(checkInTime),
        is_4f: is4F,
      },
    });

    res.status(200).json(newRecord);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
