import { HeaderSimple } from '../component/base/header/header';
import Userscard from '../component/base/usersCard/userscard';

const Statspage = () => {
  return (
    <>
      <HeaderSimple
        links={[
          { link: '/', label: 'Home' },
          { link: '/stats', label: 'Stats' },
          { link: '/user', label: 'Users' },
        ]}
      />
      <Userscard />
    </>
  );
};

export default Statspage;
