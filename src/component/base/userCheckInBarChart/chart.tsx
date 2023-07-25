import { LoadingOverlay } from '@mantine/core';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';
import type { UsertimeObject } from '../../../pages/api/users/getTimeByUser';

const UserCheckInChart = () => {
  const [userTimeData, setUserTimeData] = useState<UsertimeObject[]>([]);
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (session?.user?.id) {
      fetch(`/api/users/getTimeByUser?id=${session.user.id}`)
        .then((response) => response.json())
        .then((data) => {
          setUserTimeData(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error:', error);
          setLoading(false);
        });
    }
  }, [session?.user?.id]);

  return (
    <BarChart width={1000} height={500} data={userTimeData}>
      <LoadingOverlay visible={loading} />

      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" angle={-45} textAnchor="end" interval={0} height={100} />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="time" fill="#8884d8" name="滞在時間(Hour)" />
    </BarChart>
  );
};

export default UserCheckInChart;
