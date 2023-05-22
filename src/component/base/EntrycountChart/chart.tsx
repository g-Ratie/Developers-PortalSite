import { useEffect, useState } from 'react';
import { Bar, BarChart, Brush, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';
export interface DataObject {
  day: string;
  value: number;
}

const MonthlyChart = () => {
  const [entryData, setEntryData] = useState<DataObject[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch('/api/entrycount')
      .then((response) => response.json())
      .then((data) => {
        setEntryData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        setLoading(false);
      });
  }, []);

  return (
    <BarChart
      width={1000}
      height={500}
      data={entryData}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="day" angle={-45} textAnchor="end" interval={0} height={100} />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="value" fill="#8884d8" name="入室人数" />
      <Brush dataKey="day" stroke="#8884d8" />
    </BarChart>
  );
};

export default MonthlyChart;
