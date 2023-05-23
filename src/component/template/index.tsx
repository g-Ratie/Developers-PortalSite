import { Center } from '@mantine/core';
import { HeaderSimple } from '../base/header/header';
import { TodayCard } from '../base/todayCard/todaycard';

const IndexPage = () => {
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

export default IndexPage;
