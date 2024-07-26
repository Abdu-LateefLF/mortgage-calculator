import { MortgageInfo } from "../App";
import useMortgage from "../hooks/useMortgage";
import PaymentDetail from "./PaymentDetail";
import frequencies from "../components/frequencies";
import { MdPayment } from "react-icons/md";
import { TbSum } from "react-icons/tb";
import { RiCoinsLine } from "react-icons/ri";

interface Props {
  info: MortgageInfo;
}

function Results({ info }: Props) {
  const { payment, totalPayment, totalInterest, frequency } = useMortgage(info);

  const paymentType =
    frequencies.find((freq) => freq.value === frequency)?.name || "Monthly";

  return (
    <div className="d-flex flex-column align-items-start rounded p-3 results">
      <h3 className="mb-3 fs-2">Calculation Summary</h3>
      <section className="d-flex flex-column">
        <PaymentDetail title={paymentType + " Payment"} paymentInfo={payment}>
          <MdPayment size="30px" />
        </PaymentDetail>
        <PaymentDetail title="Total Payment" paymentInfo={totalPayment}>
          <TbSum size="30px" />
        </PaymentDetail>
        <PaymentDetail title="Total Interest Paid" paymentInfo={totalInterest}>
          <RiCoinsLine size="30px" />
        </PaymentDetail>
      </section>
    </div>
  );
}

export default Results;
