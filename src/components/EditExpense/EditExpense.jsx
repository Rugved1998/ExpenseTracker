import React, { useState, useEffect } from 'react';

export default function EditExpense({ transaction, onClose, onSave }) {
  const [title, setTitle] = useState(transaction.title);
  const [amount, setAmount] = useState(transaction.amount);
  const [category, setCategory] = useState(transaction.category);
  const [date, setDate] = useState(transaction.date);

  useEffect(() => {
    setTitle(transaction.title);
    setAmount(transaction.amount);
    setCategory(transaction.category);
    setDate(transaction.date);
  }, [transaction]);

  const handleSubmit = () => {
    const value = parseFloat(amount);
    if (title && !isNaN(value) && category && date) {
      onSave({ ...transaction, title, amount: value, category, date });
      onClose();
    }
  };

  return (
    <div className="modal">
      <h2>Edit Expense</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="number"
        placeholder="Price"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <button onClick={handleSubmit}>Save Changes</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
}


