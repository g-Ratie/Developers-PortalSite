import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { Area, AreaChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';
import type { UsertimeObject } from '../../../pages/api/users/getTimeByUser';

// Example data

// Function to accumulate time values
const accumulateTime = (data: UsertimeObject[]) => {
  const sortedData = data.sort((a, b) => {
    if (a.date > b.date) {
      return 1;
    }
    return -1;
  });
  console.log(sortedData, 'sortedData');
  let accumulatedTime = 0;
  return sortedData.map((entry) => {
    accumulatedTime += entry.time;
    return { ...entry, accumulatedTime };
  });
};

const MyLineChart = () => {
  const [userTimeData, setUserTimeData] = useState<UsertimeObject[]>([]);
  const { data: session } = useSession();
  const accumulatedData = accumulateTime(userTimeData);
  useEffect(() => {
    if (session?.user?.id) {
      fetch(`/api/users/getTimeByUser?id=961173651061866546`)
        .then((response) => response.json())
        .then((data) => {
          setUserTimeData(data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }, [session?.user?.id]);

  return (
    <AreaChart width={800} height={300} data={accumulatedData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey="date"
        tickFormatter={(date) => {
          const dateObj = new Date(date);
          return `${dateObj.getMonth() + 1}/${dateObj.getDate()}`;
        }}
        angle={-45}
        textAnchor="end"
        interval={1}
        height={100}
      />
      <YAxis />
      <Tooltip />
      <Legend />
      <Area
        type="monotone"
        dataKey="accumulatedTime"
        name="合計滞在時間(Hour)"
        stroke="#8884d8"
        fill="#8884d8"
      />
    </AreaChart>
  );
};

export default MyLineChart;
