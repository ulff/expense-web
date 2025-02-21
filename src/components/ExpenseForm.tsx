"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./ExpenseForm.css";

const categories: string[] = [
  "Food",
  "Transport",
  "Entertainment",
  "Health",
  "Shopping",
  "Bills",
  "Other",
];

interface ExpenseFormData {
  dateSpent: Date;
  amount: string;
  category: string;
  label?: string;
}

export const ExpenseForm: React.FC = () => {
  const [formData, setFormData] = useState<ExpenseFormData>({
    dateSpent: new Date(),
    amount: "",
    category: "",
    label: "",
  });

  // Handle amount input (allow only numbers & comma for PLN format)
  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9,]/g, ""); // Only numbers & comma
    if (value.split(",").length > 2) return; // Only one comma allowed
    setFormData((prev) => ({ ...prev, amount: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    alert("Expense saved!");
  };

  return (
    <div className="expense-form-container">
      <h2 className="form-title">Add Expense</h2>
      <div className="expense-form-inner">
        <form onSubmit={handleSubmit}>
          <label className="form-label">Date Spent</label>
          <DatePicker
            selected={formData.dateSpent}
            onChange={(date: Date | null) =>
              date && setFormData((prev) => ({ ...prev, dateSpent: date }))
            }
            className="form-input"
            dateFormat="dd/MM/yyyy"
          />

          <label className="form-label">Amount (PLN)</label>
          <input
            type="text"
            value={formData.amount}
            onChange={handleAmountChange}
            className="form-input"
            placeholder="Enter amount (e.g., 123,45)"
          />

          <label className="form-label">Category</label>
          <select
            value={formData.category}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setFormData((prev) => ({ ...prev, category: e.target.value }))
            }
            className="form-input"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <label className="form-label">Label (Optional)</label>
          <input
            type="text"
            value={formData.label}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setFormData((prev) => ({ ...prev, label: e.target.value }))
            }
            className="form-input"
            placeholder="Short description"
          />

          <button type="submit" className="submit-button">
            Save Expense
          </button>
        </form>
      </div>
    </div>
  );
};

export default ExpenseForm;
