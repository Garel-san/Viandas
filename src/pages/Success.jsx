import { Navigate } from "react-router-dom";

import PedirBreadcrumb from "../components/Pedir/PedirBreadcrumb";
import SuccessSummary from "../components/SuccessSummary";

import { useCheckout } from "../context/CheckoutContext";

export default function Success() {
  const { step, result } = useCheckout();
  s;
  if (step !== "success" || !result.orderId) {
    return <Navigate to="/pedir" replace />;
  }

  return (
    <main>
      <PedirBreadcrumb activeStep={3} />
      <SuccessSummary />
    </main>
  );
}
