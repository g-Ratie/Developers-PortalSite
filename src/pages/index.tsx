import { Center } from '@mantine/core';
import { TodayCard } from '../component/base/todayCard/todaycard';
import { HeaderSimple } from '../component/header';

const Demopage = () => {
  return (
    <>
      <HeaderSimple
        links={[
          { link: '/', label: 'Home' },
          { link: '/stats', label: '統計データ' },
          { link: '/user', label: 'ユーザー' },
        ]}
      />
      <Center>
        <TodayCard />
      </Center>
    </>
  );
};

export default Demopage;
