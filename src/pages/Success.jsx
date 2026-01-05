import { Navigate, useNavigate } from "react-router-dom";

import { useCheckout } from "../context/CheckoutContext";
import { useOrder } from "../context/OrderDataContext";

import PedirBreadcrumb from "../components/Pedir/PedirBreadcrumb";
import SuccessSummary from "../components/SuccessSummary";

import styles from "./Success.module.css";

export default function Success() {
  const navigate = useNavigate();

  const { result, guest, delivery, payment, isConfirming, resetCheckout } =
    useCheckout();

  const { orderItems, total, clearOrder } = useOrder();

  // ⛔ Bloqueo SOLO si el acceso es inválido real
  if (!result && !isConfirming) {
    return <Navigate to="/" replace />;
  }

  // ⏳ Espera mientras se confirma la orden
  if (!result) {
    return null;
  }

  const resetAll = () => {
    resetCheckout();
    clearOrder();
  };

  const handleNewOrder = () => {
    resetAll();
    navigate("/pedir");
  };

  const handleGoHome = () => {
    resetAll();
    navigate("/");
  };

  return (
    <main className={styles.page}>
      <PedirBreadcrumb />

      <SuccessSummary
        result={result}
        guest={guest}
        delivery={delivery}
        payment={payment}
        orderItems={orderItems}
        total={total}
      />

      <div className={styles.actions}>
        <button className={styles.primaryBtn} onClick={handleNewOrder}>
          HACER OTRO PEDIDO
        </button>

        <button className={styles.secondaryBtn} onClick={handleGoHome}>
          VOLVER AL INICIO
        </button>
      </div>
    </main>
  );
}
