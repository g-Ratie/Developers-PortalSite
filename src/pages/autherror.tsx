import Errorcard from '../component/base/autherrorcard';
import { HeaderSimple } from '../component/base/header/header';

const ErrorPage = () => {
  return (
    <>
      <HeaderSimple
        links={[
          { link: '/', label: 'Home' },
          { link: '/stats', label: 'Stats' },
          { link: '/user', label: 'Users' },
        ]}
      />
      <Errorcard />
    </>
  );
};

export default ErrorPage;
