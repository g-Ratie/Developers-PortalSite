import ChartTabs from '../component/base/chartTabs/Tabs';
import { HeaderSimple } from '../component/base/template/header/header';

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
      <ChartTabs />
    </>
  );
};

export default Statspage;
