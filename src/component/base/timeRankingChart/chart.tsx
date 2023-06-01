import { LoadingOverlay } from '@mantine/core';
import { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';

export interface DataObject {
  name: string;
  value: number;
}

const RankingChart = () => {
  const [rankingData, setRankingData] = useState<DataObject[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch('/api/usertimeranking')
      .then((response) => response.json())
      .then((data) => {
        setRankingData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        setLoading(false);
      });
  }, []);

  return (
    <BarChart width={1000} height={500} data={rankingData}>
      <LoadingOverlay visible={loading} />

      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" angle={-45} textAnchor="end" interval={0} height={100} />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="value" fill="#8884d8" name="滞在時間(Hour)" />
    </BarChart>
  );
};

export default RankingChart;
