import { useState, useEffect } from "react";

function MeasurementConverter() {
  const [amount, setAmount] = useState("");
  const [fromUnit, setFromUnit] = useState("grams");
  const [toUnit, setToUnit] = useState("kilograms");
  const [result, setResult] = useState(null);

  // Conversion factors
  const conversions = {
    grams: { kilograms: 0.001 },
    kilograms: { grams: 1000 },
    milliliters: { liters: 0.001 },
    liters: { milliliters: 1000 },
    teaspoons: { tablespoons: 1 / 3 },
    tablespoons: { teaspoons: 3 },
    cups: { milliliters: 240 },
    milliliters: { cups: 1 / 240 },
  };

  useEffect(() => {
    const value = parseFloat(amount);
    if (isNaN(value)) {
      setResult(null);
      return;
    }

    if (fromUnit === toUnit) {
      setResult(value.toFixed(2));
      return;
    }

    // Check if conversion exists
    if (conversions[fromUnit] && conversions[fromUnit][toUnit]) {
      setResult((value * conversions[fromUnit][toUnit]).toFixed(2));
    } else if (conversions[toUnit] && conversions[toUnit][fromUnit]) {
      // Inverse conversion if only defined one way
      setResult((value / conversions[toUnit][fromUnit]).toFixed(2));
    } else {
      setResult("Conversion not supported");
    }
  }, [amount, fromUnit, toUnit]);

  return (
    <div className="container">
      <h1>Measurement Converter</h1>

      <div className="input-group">
        <label>Amount:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
        />
      </div>

      <div className="input-group">
        <label>From:</label>
        <select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)}>
          <option value="grams">grams (g)</option>
          <option value="kilograms">kilograms (kg)</option>
          <option value="milliliters">milliliters (ml)</option>
          <option value="liters">liters (l)</option>
          <option value="teaspoons">teaspoons (tsp)</option>
          <option value="tablespoons">tablespoons (tbsp)</option>
          <option value="cups">cups</option>
        </select>
      </div>

      <div className="input-group">
        <label>To:</label>
        <select value={toUnit} onChange={(e) => setToUnit(e.target.value)}>
          <option value="grams">grams (g)</option>
          <option value="kilograms">kilograms (kg)</option>
          <option value="milliliters">milliliters (ml)</option>
          <option value="liters">liters (l)</option>
          <option value="teaspoons">teaspoons (tsp)</option>
          <option value="tablespoons">tablespoons (tbsp)</option>
          <option value="cups">cups</option>
        </select>
      </div>

      {result && (
        <div className="result">
          <h2>Result: {result} {toUnit}</h2>
        </div>
      )}
    </div>
  );
}

export default MeasurementConverter;
