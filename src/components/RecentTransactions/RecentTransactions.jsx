import React from 'react';
import styles from '../RecentTransactions/RecentTransactions.module.css'

export default function RecentTransactions({ transactions, onEditClick, onDeleteClick }) {
  return (
    <div className={styles.transactionsSection}>
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
