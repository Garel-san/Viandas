import { useCheckout } from "../../context/CheckoutContext";
import styles from "./PaymentSection.module.css";

export default function PaymentSection() {
  const { payment, actions } = useCheckout();

  const handleSelect = (method) => {
    actions.selectPaymentMethod(method);
  };

  const handleSubmit = () => {
    actions.confirmOrder();
  };

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>
        <span className={styles.step}>3</span>
        Información de pago
      </h2>

      <p className={styles.subtitle}>¿Cómo vas a abonar?</p>

      {/* MÉTODOS */}
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

      {/* FUTURO MODAL TARJETA */}
      {payment.method === "card" && (
        <div className={styles.cardNotice}>
          Ingresá los datos de tu tarjeta (funcionalidad en desarrollo)
        </div>
      )}

      {/* ACCIONES */}
      <div className={styles.actions}>
        <button
          type="button"
          className={styles.primaryBtn}
          onClick={handleSubmit}
          disabled={!payment.method}
        >
          PROCEDER AL PAGO
        </button>

        <button type="button" className={styles.linkBtn}>
          Volver
        </button>
      </div>
    </section>
  );
}
