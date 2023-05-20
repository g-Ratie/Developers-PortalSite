import { Center } from '@mantine/core';
import { HeaderSimple } from '../component/base/template/header/header';
import { TodayCard } from '../component/base/todayCard/todaycard';

const Demopage = () => {
  return (
    <>
      <HeaderSimple
        links={[
          { link: '/', label: 'Home' },
          { link: '/stats', label: 'Stats' },
          { link: '/user', label: 'Users' },
        ]}
      />
      <Center>
        <TodayCard />
      </Center>
    </>
  );
};

export default Demopage;
