import { OfficeAccessCard } from '../base/OfficeAccessCard/officeaccescard';
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
      <OfficeAccessCard />
      <TodayCard />
    </>
  );
};

export default IndexPage;
