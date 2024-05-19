import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend } from 'recharts';



export default function TopExpense  ({ transactions })  {
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

  
  return (
    <div className="top-expense-section">
      <h2>Top Expenses</h2>
      <div className="chart-container">
        <div className="bar-chart">
            
          <BarChart width={600} height={300} data={categoryData} >
             <XAxis dataKey="category" />
            {/* <YAxis /> */}
            {/* <Tooltip /> */}
            
             <Bar dataKey="amount" fill="#8884d8" /> 
            
          </BarChart>
        </div>
      </div>
    </div>
  );
};

