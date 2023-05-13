import { useState } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';

export interface DataObject {
  name: string;
  value: number;
}

const Chart = ({ data }: { data: DataObject[] }) => {
  const [chartData, setChartData] = useState();

  
  return (
    <BarChart width={1000} height={500} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" angle={-45} textAnchor="end" interval={0} height={100} />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="value" fill="#8884d8" name="滞在時間(Hour)" />
    </BarChart>
  );
};

export default Chart;
