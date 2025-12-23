import { useNavigate } from "react-router-dom";

import { useCheckout } from "../../context/CheckoutContext";
import { useOrder } from "../../context/OrderDataContext";

import styles from "./PaymentSection.module.css";

export default function PaymentSection() {
  const navigate = useNavigate();

  const { payment, selectPaymentMethod, confirmOrder, prevStep } =
    useCheckout();

  const { getOrderSnapshot } = useOrder();

  const handleSelect = (method) => {
    selectPaymentMethod(method);
  };

  const handleSubmit = () => {
    const orderSnapshot = getOrderSnapshot();
    const ok = confirmOrder(orderSnapshot);

    if (!ok) {
      alert("No se pudo confirmar el pedido. Verificá los datos.");
      return;
    }

    navigate("/success");
  };

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>
        <span className={styles.step}>3</span>
        Información de pago
      </h2>

      <p className={styles.subtitle}>¿Cómo vas a abonar?</p>

      <div className={styles.methods}>
        <button
          type="button"
          className={`${styles.methodBtn} ${
            payment.method === "card" ? styles.active : ""
          }`}
          onClick={() => handleSelect("card")}
        >
          Pago online con tarjeta
        </button>

        <button
          type="button"
          className={`${styles.methodBtn} ${
            payment.method === "cash" ? styles.active : ""
          }`}
          onClick={() => handleSelect("cash")}
        >
          Contraentrega – Efectivo
        </button>

        <button
          type="button"
          className={`${styles.methodBtn} ${
            payment.method === "pos" ? styles.active : ""
          }`}
          onClick={() => handleSelect("pos")}
        >
          Contraentrega – POS
        </button>
      </div>

      {payment.method === "card" && (
        <div className={styles.cardNotice}>
          Ingresá los datos de tu tarjeta (funcionalidad en desarrollo)
        </div>
      )}

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.primaryBtn}
          onClick={handleSubmit}
          disabled={!payment.method}
        >
          CONFIRMAR PEDIDO
        </button>

        <button type="button" className={styles.linkBtn} onClick={prevStep}>
          Volver
        </button>
      </div>
    </section>
  );
}
