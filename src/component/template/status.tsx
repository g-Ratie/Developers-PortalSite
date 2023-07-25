import { OfficeAccessCard } from '../base/OfficeAccessCard/officeaccesscard';
import { HeaderSimple } from '../base/header/header';
import { OfficeStatusCard } from '../base/officeStatusCard/officestatuscard';
import UserCheckInChart from '../base/userCheckInBarChart/chart';
import MyLineChart from '../base/userCheckInLineChart/chart';

const StatusPage = () => {
  return (
    <>
      <HeaderSimple />
      <OfficeAccessCard />
      <OfficeStatusCard />
      <UserCheckInChart />
      <MyLineChart />
    </>
  );
};

export default StatusPage;
