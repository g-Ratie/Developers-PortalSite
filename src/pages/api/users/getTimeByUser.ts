import type { NextApiRequest, NextApiResponse } from 'next';
import { dailyRecordUsecase } from './../../../utils/Usecase/dailyRecordUsecase';

export interface UsertimeObject {
  date: Date;
  time: number;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const userId = BigInt(req.query.id as string);
  const userRecords = await dailyRecordUsecase.getDailyRecordsByUserId(userId);
  if (userRecords === null) {
    res.status(404).json({ message: 'user not found' });
    return;
  }
  const userTimeData: UsertimeObject[] = [];
  userRecords.forEach((record) => {
    const checkIn = record.check_in;
    const checkOut = record.check_out;
    if (checkOut === null) {
      userTimeData.push({
        date: checkIn,
        time: 0,
      });
    } else {
      userTimeData.push({
        date: new Date(checkIn.getFullYear(), checkIn.getMonth(), checkIn.getDate()),
        time: Math.round((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60)),
      });
    }
  });
  res.status(200).json(userTimeData);
}
