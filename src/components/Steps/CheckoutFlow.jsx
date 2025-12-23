import { useCheckout } from "../../context/CheckoutContext";

import GuestSection from "./GuestSection";
import DeliverySection from "./DeliverySection";
import PaymentSection from "./PaymentSection";

export default function CheckoutFlow() {
  const { step } = useCheckout();

  switch (step) {
    case 1:
      return <GuestSection />;

    case 2:
      return <DeliverySection />;

    case 3:
      return <PaymentSection />;

    default:
      return null;
  }
}
