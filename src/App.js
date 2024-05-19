import React, { useState, useEffect } from 'react';
import AddIncome from './components/AddIncome/AddIncome';
import AddExpense from './components/AddExpense/AddExpense';
import EditExpense from './components/EditExpense/EditExpense';
import RecentTransactions from './components/RecentTransactions/RecentTransactions';
import TopExpense from './components/TopExpense/TopExpense';
import ExpensePieChart from './components/ExpensePieChart/ExpensePieChart';
import './App.css';

export default function App() {
  
  const initialBalance = parseFloat(localStorage.getItem('balance')) || 4500;
  const initialExpenses = parseFloat(localStorage.getItem('expenses')) || 500;
  const initialTransactions = JSON.parse(localStorage.getItem('transactions')) || [
    { id: 1, title: 'Samosa', amount: 150, date: '2024-03-20', category: 'Food' },
    { id: 2, title: 'Movie', amount: 300, date: '2024-03-21', category: 'Entertainment' },
    { id: 3, title: 'Auto', amount: 50, date: '2024-03-22', category: 'Travel' },
  ];

  const [balance, setBalance] = useState(initialBalance);
  const [expenses, setExpenses] = useState(initialExpenses);
  const [transactions, setTransactions] = useState(initialTransactions);
  const [showAddBalance, setShowAddBalance] = useState(false);
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [showEditExpense, setShowEditExpense] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState(null);

  
  useEffect(() => {
    localStorage.setItem('balance', balance);
  }, [balance]);

  useEffect(() => {
    localStorage.setItem('expenses', expenses);
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const handleAddBalance = (amount) => {
    setBalance(balance + amount);
  };

  const handleAddExpense = (expense) => {
    if (expense.amount > balance) {
      alert('Expense amount exceeds the wallet balance!');
      return;
    }
    setExpenses(expenses + expense.amount);
    setBalance(balance - expense.amount);
    setTransactions([...transactions, { ...expense, id: transactions.length + 1 }]);
  };

  const handleEditExpense = (updatedExpense) => {
    const updatedTransactions = transactions.map((transaction) =>
      transaction.id === updatedExpense.id ? updatedExpense : transaction
    );
    setTransactions(updatedTransactions);
  };

  const handleDeleteTransaction = (transactionId) => {
    const updatedTransactions = transactions.filter(transaction => transaction.id !== transactionId);
    const deletedTransaction = transactions.find(transaction => transaction.id === transactionId);
    setTransactions(updatedTransactions);
    setExpenses(expenses - deletedTransaction.amount);
    setBalance(balance + deletedTransaction.amount);
  };

  const handleEditClick = (transaction) => {
    setCurrentTransaction(transaction);
    setShowEditExpense(true);
  };

  return (
    <div className="App">
      <header>
        <h1>Expense Tracker</h1>
        <div className="balance-section">
          <div>
            <h2>Wallet Balance: ₹{balance}</h2>
            <button onClick={() => setShowAddBalance(true)}>+ Add Income</button>
          </div>
          <div>
            <h2>Expenses: ₹{expenses}</h2>
            <button onClick={() => setShowAddExpense(true)}>+ Add Expense</button>
          </div>
          <div>
          <ExpensePieChart transactions={transactions} />
          </div>
        </div>
        
      </header>
      <main>
        <RecentTransactions transactions={transactions} onEditClick={handleEditClick} onDeleteClick={handleDeleteTransaction} />
        <TopExpense transactions={transactions} />
      </main>
      {showAddBalance && <AddIncome onClose={() => setShowAddBalance(false)} onSave={handleAddBalance} />}
      {showAddExpense && <AddExpense onClose={() => setShowAddExpense(false)} onSave={handleAddExpense} />}
      {showEditExpense && (
        <EditExpense
          transaction={currentTransaction}
          onClose={() => setShowEditExpense(false)}
          onSave={handleEditExpense}
        />
      
      )}
    </div>
  );
}
