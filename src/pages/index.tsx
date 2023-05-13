import { PrismaClient } from '@prisma/client';
import type { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import { HeaderSimple } from '../component/header';
const Chart = dynamic(() => import('../component/chart'), { ssr: false });
type Props = {
  count: number;
  inoutcount: number;
  usertimedata: [{ name: string; value: number }];
};
export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const prisma = new PrismaClient();
  const count = await prisma.users.count();
  const inoutcount = await prisma.daily_records.count();
  const usertimedata: [{ name: string; value: number }] = [{ name: '', value: 0 }];
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
        usertimedata[index].value += (nowtime - in_time.getTime()) / (1000 * 60 * 60);
      } else {
        usertimedata[index].value += (out_time.getTime() - in_time.getTime()) / (1000 * 60 * 60);
      }
    } else {
      if (out_time === null) {
        usertimedata.push({
          name: userName,
          value: (nowtime - in_time.getTime()) / (1000 * 60 * 60),
        });
      } else {
        usertimedata.push({
          name: userName,
          value: (out_time.getTime() - in_time.getTime()) / (1000 * 60 * 60),
        });
      }
    }
  });
  const sortedUserTimeData = usertimedata.sort((a, b) => b.value - a.value);
  return {
    props: {
      count,
      inoutcount,
      usertimedata: sortedUserTimeData,
    },
  };
};

const Demopage = (props: Props) => {
  return (
    <HeaderSimple
      links={[
        { link: '/', label: 'Home' },
        { link: '/stats', label: 'Stats' },
        { link: '/demo', label: 'User' },
      ]}
    />
  );
};

export default Demopage;
