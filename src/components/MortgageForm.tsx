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
      invalid_type_error: "Loan amount is required",
    })
    .min(10, { message: "Loan amount must be larger than 10 dollars" })
    .max(1000000000000, {
      message: "Loan amount is too large! Maximum value is 1,000,000,000,000",
    }),
  interestRate: z
    .number({
      invalid_type_error: "Interest rate is required",
    })
    .min(0.5, {
      message: "Interest rate must be greater than 0.5%",
    })
    .max(200, "Interest rate is too high! Maximum is 200%"),
  loanTerm: z
    .number({
      invalid_type_error: "Loan term is required",
    })
    .min(1, { message: "Loan term must be greater than 1" })
    .max(100, { message: "Loan term is too long! Maximum is 100 years" }),
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
    <form noValidate className="d-flex flex-column mb-5 fs-5 px-4">
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
        {errors.loanAmount ? (
          <p className="form-text text-danger">{errors.loanAmount.message}</p>
        ) : (
          <p className="form-text">The principle amount of your loan</p>
        )}
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
        {errors.interestRate ? (
          <p className="form-text text-danger">{errors.interestRate.message}</p>
        ) : (
          <p className="form-text">The annual interest rate of your loan</p>
        )}
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
        {errors.loanTerm ? (
          <p className="form-text text-danger">{errors.loanTerm.message}</p>
        ) : (
          <p className="form-text">
            The number of years in which the loan will be repaid
          </p>
        )}
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
      <div className="d-flex flex-column align-items-center flex-lg-row-reverse">
        <button
          className="btn btn-md btn-danger mx-3 mb-3"
          type="button"
          onClick={() => {
            reset();
            onFormSubmit({} as MortgageInfo);
          }}
        >
          Reset <MdOutlineClear />
        </button>
        <button
          type="button"
          className="btn btn-md btn-primary mb-3"
          onClick={handleSubmit((data: FormData) => {
            onFormSubmit(data);
          })}
        >
          Calculate <BsCalculatorFill />
        </button>
      </div>
    </form>
  );
}

export default MortgageForm;
