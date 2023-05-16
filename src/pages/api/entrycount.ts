import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

export interface DataObject {
  name: string;
  value: number;
}

interface DayObject {
  day: string;
  value: number;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const prisma = new PrismaClient();
  const result: DayObject[] = [];
  const alldata = await prisma.daily_records.findMany({
    include: {
      users: true,
    },
  });
  alldata.forEach((data) => {
    const day_of_week = ['日', '月', '火', '水', '木', '金', '土'];
    //曜日を取得
    const in_day_day_of_week = day_of_week[data.check_in.getDay()];

    //date型から日時を取得し、文字列に変換して、曜日を追加
    const in_day = `${data.check_in.toLocaleDateString()}(${in_day_day_of_week})`;
    if (result.some((data) => data.day === in_day)) {
      const index = result.findIndex((data) => data.day === in_day);
      result[index].value += 1;
    } else {
      result.push({
        day: in_day,
        value: 1,
      });
    }
  });
  //日付順にソート
  result.sort(function (a, b) {
    return a > b ? 1 : -1;
  });
  const sortedData = result.sort((a, b) => new Date(a.day).getTime() - new Date(b.day).getTime());
  res.status(200).json(sortedData);
}
