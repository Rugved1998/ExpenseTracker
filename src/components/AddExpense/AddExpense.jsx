import React, { useState } from 'react';

export default function AddExpense({ onClose, onSave }) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = () => {
    const value = parseFloat(amount);
    if (title && !isNaN(value) && category && date) {
      onSave({ title, amount: value, category, date });
      onClose();
    }
  };

  return (
    <div className="modal">
      <h2>Add Expense</h2>
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
      <button onClick={handleSubmit}>Add Expense</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
}


