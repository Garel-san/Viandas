import { useCheckout } from "../../context/CheckoutContext";

// Estos componentes los crearemos luego
import GuestSection from "./GuestSection";
import DeliverySection from "./DeliverySection";
import PaymentSection from "./PaymentSection";

export default function CheckoutFlow() {
  const { step } = useCheckout();

  if (step === "guest") {
    return <GuestSection />;
  }

  if (step === "delivery") {
    return <DeliverySection />;
  }

  if (step === "payment") {
    return <PaymentSection />;
  }

  // Estado terminal (success)
  return null;
}
