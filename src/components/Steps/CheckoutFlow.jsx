import { useCheckout } from "../../context/CheckoutContext";

import GuestSection from "./GuestSection";
import DeliverySection from "./DeliverySection";
import PaymentSection from "./PaymentSection";

import styles from "./CheckoutFlow.module.css";

/* =====================================================
   HELPERS – SUMMARY TEXT
===================================================== */
function getGuestSummary(guest) {
  if (!guest?.fullName) return null;
  return `Invitado identificado como ${guest.fullName}`;
}

function getDeliverySummary(delivery) {
  if (!delivery?.date) return null;

  if (delivery.mode === "pickup") {
    return "Seleccionaste retirar tu pedido en el local";
  }

  const date = delivery.date.toLocaleDateString("es-AR");
  const address = `${delivery.address.street} ${delivery.address.number}`;

  if (delivery.mode === "specific" && delivery.specificTime) {
    return `Entregaremos el pedido en ${address}, el ${date} entre las ${delivery.specificTime}`;
  }

  return `Entregaremos el pedido en ${address}, el ${date}`;
}

function getPaymentSummary(payment) {
  if (!payment?.method) return null;

  const labels = {
    card: "Pago seleccionado: Tarjeta",
    cash: "Pago seleccionado: Efectivo",
    pos: "Pago seleccionado: POS",
  };

  return labels[payment.method] || null;
}

/* =====================================================
   STEP WRAPPER
===================================================== */
function CheckoutStep({
  index,
  title,
  status, // "pending" | "active" | "completed"
  summary,
  children,
}) {
  return (
    <div className={styles.step}>
      <div
        className={`${styles.stepHeader} ${
          status === "completed"
            ? styles.completed
            : status === "active"
            ? styles.active
            : styles.pending
        }`}
      >
        <div
          className={`${styles.stepIndicator} ${
            status === "completed"
              ? styles.indicatorCompleted
              : styles.indicatorDefault
          }`}
        >
          {status === "completed" ? "✓" : index}
        </div>

        <span>{title}</span>
      </div>

      {status === "completed" && summary && (
        <div className={styles.stepSummary}>{summary}</div>
      )}

      {status === "active" && <div className={styles.stepBody}>{children}</div>}
    </div>
  );
}

/* =====================================================
   CHECKOUT FLOW
===================================================== */
export default function CheckoutFlow() {
  const { step, guest, delivery, payment } = useCheckout();

  return (
    <div className={styles.flow}>
      <CheckoutStep
        index={1}
        title="Continuar el pedido como invitado"
        status={step > 1 ? "completed" : step === 1 ? "active" : "pending"}
        summary={getGuestSummary(guest)}
      >
        <GuestSection />
      </CheckoutStep>

      <CheckoutStep
        index={2}
        title="Información de entrega"
        status={step > 2 ? "completed" : step === 2 ? "active" : "pending"}
        summary={getDeliverySummary(delivery)}
      >
        <DeliverySection />
      </CheckoutStep>

      <CheckoutStep
        index={3}
        title="Información de pago"
        status={step === 3 ? "active" : "pending"}
        summary={getPaymentSummary(payment)}
      >
        <PaymentSection />
      </CheckoutStep>
    </div>
  );
}
