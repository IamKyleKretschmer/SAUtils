import { Routes, Route, Link } from "react-router-dom";
import SalaryCalculator from "./pages/SalaryCalculator";
import TextDiffCheck from "./pages/TextDiffCheck";
import MeasurementConverter from "./pages/MeasurementConverter";
import VatCalculator from "./pages/VatCalculator";

function App() {
  return (
    <div>
      <header className="header">
        <nav>
          <ul className="nav-list">
            <li><Link to="/">Salary Calculator</Link></li>
            <li><Link to="/vat-calculator">VAT Calculator</Link></li>
            <li><Link to="/measurement-conversion">Measurement Conversion</Link></li>
            <li><Link to="/Text-diff">Text difference</Link></li>
          </ul>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<SalaryCalculator />} />
          <Route path="/vat-calculator" element={<VatCalculator />} />
          <Route path="/measurement-conversion" element={<MeasurementConverter />} />
          <Route path="/text-diff" element={<TextDiffCheck />} />

          
        </Routes>
      </main>
    </div>
  );
}

export default App;
