import { useForm } from "react-hook-form";
import { MortgageInfo } from "../App";
import frequencies from "./frequencies";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { BsCalculatorFill } from "react-icons/bs";
import { MdOutlineClear } from "react-icons/md";

const schema = z.object({
  loanAmount: z
    .number({
      required_error: "The principle amount of your loan",
      invalid_type_error: "Loan amount must be a number",
    })
    .min(0, { message: "Loan amount must be a positive number" })
    .max(1000000000000, {
      message: "Loan amount is too large! Maximum value is 1,000,000,000,000",
    }),
  interestRate: z
    .number({
      required_error: "The annual interest rate of your loan",
      invalid_type_error: "Interest rate must be a number",
    })
    .min(0, {
      message: "Interest rate must be a positive number",
    }),
  loanTerm: z
    .number({
      required_error: "The number of years in which the loan will be repaid",
      invalid_type_error: "Loan term must be a number",
    })
    .min(0, { message: "Loan term must be a positive number" })
    .max(1000, { message: "Loan term is too long! Maximum is 1,000 years" }),
  paymentFrequency: z.number(),
});

type FormData = z.infer<typeof schema>;

interface Props {
  onFormSubmit: (info: MortgageInfo) => void;
}

function MortgageForm({ onFormSubmit }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  return (
    <form
      className="d-flex flex-column mb-5 fs-5 px-4"
      onSubmit={handleSubmit((data: FormData) => {
        console.log(data);
        onFormSubmit(data);
      })}
    >
      <div className="mb-1 p-3 rounded form-section">
        <label htmlFor="loanAmount" className="form-label fw-bold">
          {"Loan Amount ($)"}
        </label>
        <input
          {...register("loanAmount", { valueAsNumber: true })}
          type="number"
          className="form-control border-2"
          id="loanAmount"
          step="0.1"
        />
        <div className="form-text">
          {errors.loanAmount
            ? errors.loanAmount.message
            : "The principle amount of your loan"}
        </div>
      </div>

      <div className="mb-1 p-3 rounded form-section">
        <label htmlFor="interestRate" className="form-label fw-bold">
          {"Interest Rate (%)"}
        </label>
        <input
          {...register("interestRate", { valueAsNumber: true })}
          type="number"
          className="form-control border-2"
          id="interestRate"
          step="0.1"
        />
        <div className="form-text">
          {errors.interestRate
            ? errors.interestRate.message
            : "The annual interest rate of your loan"}
        </div>
      </div>

      <div className="me-3 mb-1 p-3 rounded form-section">
        <label htmlFor="loanTerm" className="form-label fw-bold">
          {"Loan Term (yrs)"}
        </label>
        <input
          {...register("loanTerm", { valueAsNumber: true })}
          type="number"
          className="form-control border-2"
          id="loanTerm"
          step="0.1"
        />
        <div className="form-text">
          {errors.loanTerm
            ? errors.loanTerm.message
            : "The number of years in which the loan will be repaid"}
        </div>
      </div>

      <div className="mb-2 p-3 rounded form-section">
        <label htmlFor="paymentFrequency" className="form-label fw-bold">
          Payment Frequency
        </label>
        <select
          {...register("paymentFrequency", { valueAsNumber: true })}
          id="paymentFrequency"
          className="form-select border-2"
        >
          {frequencies.map((freq) => (
            <option key={freq.name} value={freq.value}>
              {freq.name}
            </option>
          ))}
        </select>
        <div className="form-text">
          {errors.paymentFrequency
            ? errors.paymentFrequency.message
            : "How often the payments are made"}
        </div>
      </div>
      <div className="d-flex flex-row-reverse">
        <button
          className="btn btn-md btn-danger mx-3"
          onClick={() => {
            reset();
            onFormSubmit({} as MortgageInfo);
          }}
        >
          Reset <MdOutlineClear />
        </button>
        <button className="btn btn-md btn-primary">
          Calculate <BsCalculatorFill />
        </button>
      </div>
    </form>
  );
}

export default MortgageForm;
