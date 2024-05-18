import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

export default function ExpensePieChart  ({ transactions })  {
  const categoryData = transactions.reduce((acc, transaction) => {
    const { category, amount } = transaction;
    const existingCategory = acc.find((item) => item.category === category);
    if (existingCategory) {
      existingCategory.amount += amount;
    } else {
      acc.push({ category, amount });
    }
    return acc;
  }, []);

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#8dd1e1', '#a4de6c', '#d0ed57'];

  return (
    <div className="pie-chart">
      <h3>Pie Chart View</h3>
      <PieChart width={400} height={400}>
        <Pie
          data={categoryData}
          dataKey="amount"
          nameKey="category"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          label
        >
          {categoryData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};


