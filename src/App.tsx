import { useState } from "react";
import MortgageForm from "./components/MortgageForm";
import Results from "./components/Results";
import "./App.css";

export interface MortgageInfo {
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
  paymentFrequency: number;
}

function App() {
  const [mortgageInfo, setMortgageInfo] = useState<MortgageInfo>(
    {} as MortgageInfo
  );

  return (
    <div className="container">
      <h1 className="my-4 px-3 fs-1">
        <img className="logo" src="/logo.png" /> Mortgage Calculator
      </h1>
      <div className="row flex-column flex-lg-row px-3">
        <div className="col col-lg-7">
          <MortgageForm onFormSubmit={(info) => setMortgageInfo(info)} />
        </div>
        <div className="col col-lg-4 offset-lg-1">
          <div className="d-flex justify-content-center">
            <Results info={mortgageInfo} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
