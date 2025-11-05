import { useState } from "react";
import "./VatCalculator.css";

export default function VatCalculator() {
  const [amount, setAmount] = useState("");
  const [isInclusive, setIsInclusive] = useState(false);
  const [vatAmount, setVatAmount] = useState(null);
  const [totalAmount, setTotalAmount] = useState(null);

  const handleCalculate = () => {
    const num = parseFloat(amount);
    if (isNaN(num)) return;

    if (isInclusive) {
      // amount already includes VAT
      const vat = (num * 15) / 115;
      setVatAmount(vat.toFixed(2));
      setTotalAmount(num.toFixed(2));
    } else {
      // amount excludes VAT
      const vat = num * 0.15;
      setVatAmount(vat.toFixed(2));
      setTotalAmount((num + vat).toFixed(2));
    }
  };

  return (
    <div className="vat-container">
      <h1>VAT Calculator (15%)</h1>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
      />
      <div className="checkbox-container">
        <label>
          <input
            type="checkbox"
            checked={isInclusive}
            onChange={(e) => setIsInclusive(e.target.checked)}
          />
          Amount includes VAT
        </label>
      </div>
      <button onClick={handleCalculate}>Calculate</button>

      {vatAmount !== null && totalAmount !== null && (
        <div className="vat-results">
          <p>VAT: R{vatAmount}</p>
          <p>Total Amount: R{totalAmount}</p>
        </div>
      )}
    </div>
  );
}
