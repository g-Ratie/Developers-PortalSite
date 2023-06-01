import { HeaderSimple } from '../base/header/header';
import { LoginStatusCard } from '../base/loginStatusCard/loginstatuscard';

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
      <LoginStatusCard />
    </>
  );
};

export default IndexPage;
