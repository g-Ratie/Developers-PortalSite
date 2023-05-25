import { Accordion, LoadingOverlay } from '@mantine/core';
import { useEffect, useState } from 'react';

export interface DataObject {
  name: string;
  latestRecord: string;
  discord_id: string;
  total: number;
}

const UserAccordion = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch('/api/users/getuserlist')
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        setLoading(false);
      });
  }, []);

  return (
    <Accordion variant="contained">
      <LoadingOverlay visible={loading} />
      {userData.map((user: DataObject) => (
        <Accordion.Item key={user.discord_id} value={user.name}>
          <Accordion.Control>{user.name}</Accordion.Control>
          <Accordion.Panel>
            <p>discordID:{user.discord_id}</p>
            <p>total:{user.total}時間</p>
            <p>最終in:{user.latestRecord}</p>
            <p>GithubID:</p>
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};

export default UserAccordion;
