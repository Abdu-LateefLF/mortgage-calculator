import { MortgageInfo } from "../App";

interface Results {
  payment: number;
  frequency: number;
  totalPayment: number;
  totalInterest: number;
}


const useMortgage = (info : MortgageInfo): Results => {

  if (!info) return {} as Results;

  const {loanAmount, interestRate, loanTerm} = info;

  const frequency = info.paymentFrequency;

  const p = loanAmount;
  const r = (interestRate / 100) / frequency;
  const n = loanTerm * frequency;

    // Calculate Payments
  const payment = (p * r * ((1 + r) **  n)) / (((1 + r) ** n) - 1); 

  const totalPayment = payment * n;

  const totalInterest = totalPayment - p;

  return {payment, totalPayment, totalInterest, frequency};
}

export default useMortgage;