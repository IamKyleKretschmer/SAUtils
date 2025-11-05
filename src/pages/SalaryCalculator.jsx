import { useState } from "react";

function SalaryCalculator() {
  const [salary, setSalary] = useState("");
  const [isMonthly, setIsMonthly] = useState(true); // true = monthly, false = yearly
  const [uiF, setUIF] = useState(true);
  const [netMonthly, setNetMonthly] = useState(null);
  const [netYearly, setNetYearly] = useState(null);

  const handleCalculate = () => {
    let gross = parseFloat(salary);
    if (isNaN(gross)) return alert("Enter a valid salary");

    let monthlyGross, yearlyGross;

    if (isMonthly) {
      monthlyGross = gross;
      yearlyGross = gross * 12;
    } else {
      yearlyGross = gross;
      monthlyGross = gross / 12;
    }

    // PAYE calculation
    let monthlyPAYE = 0;
    let yearlyPAYE = 0;

    // Monthly brackets
    if (monthlyGross <= 9875) monthlyPAYE = monthlyGross * 0.18;
    else if (monthlyGross <= 19750) monthlyPAYE = 9875 * 0.18 + (monthlyGross - 9875) * 0.26;
    else monthlyPAYE = 9875 * 0.18 + (19750 - 9875) * 0.26 + (monthlyGross - 19750) * 0.31;

    // Yearly brackets
    if (yearlyGross <= 118500) yearlyPAYE = yearlyGross * 0.18;
    else if (yearlyGross <= 237000) yearlyPAYE = 118500 * 0.18 + (yearlyGross - 118500) * 0.26;
    else yearlyPAYE = 118500 * 0.18 + (237000 - 118500) * 0.26 + (yearlyGross - 237000) * 0.31;

    // UIF (simplified: 1% of monthly gross)
    const monthlyUIF = uiF ? monthlyGross * 0.01 : 0;

    const calculatedNetMonthly = monthlyGross - monthlyPAYE - monthlyUIF;
    const calculatedNetYearly = yearlyGross - yearlyPAYE - monthlyUIF * 12;

    setNetMonthly(calculatedNetMonthly.toFixed(2));
    setNetYearly(calculatedNetYearly.toFixed(2));
  };

  return (
    <div className="container">
      <h1>Salary Take-Home Calculator</h1>

      <div className="input-group">
        <label>Salary Amount (R):</label>
        <input
          type="number"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label>
          <input
            type="checkbox"
            checked={isMonthly}
            onChange={() => setIsMonthly(!isMonthly)}
          />
          Input is monthly (uncheck for yearly)
        </label>
      </div>

      <div className="input-group">
        <label>
          <input
            type="checkbox"
            checked={uiF}
            onChange={() => setUIF(!uiF)}
          />
          Deduct UIF (1%)
        </label>
      </div>

      <button onClick={handleCalculate}>Calculate</button>

      {netMonthly && (
        <div className="result">
          {isMonthly ? (
            <h2>Net Monthly Salary: R{netMonthly}</h2>
          ) : (
            <>
              <h2>Net Yearly Salary: R{netYearly}</h2>
              <h2>Net Monthly Salary: R{netMonthly}</h2>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default SalaryCalculator;
