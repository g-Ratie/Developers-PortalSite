import { OfficeAccessCard } from '../base/OfficeAccessCard/officeaccesscard';
import { HeaderSimple } from '../base/header/header';
import { OfficeStatusCard } from '../base/officeStatusCard/officestatuscard';

const StatusPage = () => {
  return (
    <>
      <HeaderSimple />
      <OfficeAccessCard />
      <OfficeStatusCard />
    </>
  );
};

export default StatusPage;
