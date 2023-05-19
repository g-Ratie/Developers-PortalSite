import ChartTabs from '../component/base/chartTabs/Tabs';
import { HeaderSimple } from '../component/header';

const Statspage = () => {
  return (
    <>
      <HeaderSimple
        links={[
          { link: '/', label: 'Home' },
          { link: '/stats', label: '統計データ' },
          { link: '/user', label: 'ユーザー' },
        ]}
      />
      <ChartTabs />
    </>
  );
};

export default Statspage;
