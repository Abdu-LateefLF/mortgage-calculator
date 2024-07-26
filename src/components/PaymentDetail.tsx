import { ReactNode } from "react";
import { NumericFormat } from "react-number-format";

interface Props {
  title: string;
  paymentInfo: number | undefined;
  children: ReactNode;
}

function PaymentDetail({ title, paymentInfo, children }: Props) {
  return (
    <div className="mx-4 mb-3 p-3 amount">
      <h4 className="fs-5 text-primary">
        {children} {title}
      </h4>
      <p className="fs-2 fw-bold">
        {paymentInfo ? (
          <NumericFormat
            value={paymentInfo.toFixed(2)}
            displayType="text"
            thousandSeparator={true}
            prefix="$"
          />
        ) : (
          "---"
        )}
      </p>
    </div>
  );
}

export default PaymentDetail;
