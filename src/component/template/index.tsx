import { OfficeAccessCard } from '../base/OfficeAccessCard/officeaccesscard';
import { HeaderSimple } from '../base/header/header';
import { OfficeStatusCard } from '../base/officeStatusCard/officestatuscard';

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
      <OfficeStatusCard />
    </>
  );
};

export default IndexPage;
