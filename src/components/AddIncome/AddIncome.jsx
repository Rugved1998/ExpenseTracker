import React, { useState } from 'react';

 export default function AddIncome({ onClose, onSave }) {
  const [amount, setAmount] = useState('');

  const handleSubmit = () => {
    const value = parseFloat(amount);
    if (!isNaN(value)) {
      onSave(value);
      onClose();
    }
  };

  return (
    <div className="modal">
      <h2>Add Balance</h2>
      <input
        type="number"
        placeholder="Income Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handleSubmit}>Add Balance</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
}


