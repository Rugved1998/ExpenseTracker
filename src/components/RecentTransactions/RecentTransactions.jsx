import React from 'react';

export default function RecentTransactions({ transactions, onEditClick, onDeleteClick }) {
  return (
    <div className="transactions-section">
      <h2>Recent Transactions</h2>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            <span>{transaction.title}</span>
            <span>₹{transaction.amount}</span>
            <span>{transaction.date}</span>
            <button onClick={() => onEditClick(transaction)}>Edit</button>
            <button onClick={() => onDeleteClick(transaction.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
