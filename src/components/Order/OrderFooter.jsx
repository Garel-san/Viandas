import styles from "./OrderFooter.module.css";
import { useCheckout } from "../../context/CheckoutContext";

export default function OrderFooter({
  totalPedido,
  envio,
  totalFinal,
  faltantesParaMinimo,
  isMinReached,
  onStartCheckout,
}) {
  const { startCheckout, checkoutStarted } = useCheckout(); // 🔹 usamos estado

  return (
    <footer className={styles.footer}>
      {/* Mensaje mínimo */}
      {!isMinReached && !checkoutStarted && (
        <div className={styles.notice}>
          Elegí {faltantesParaMinimo}{" "}
          {faltantesParaMinimo === 1 ? "plato" : "platos"} más para continuar
        </div>
      )}

      {/* Totales */}
      <div className={styles.summary}>
        <div className={styles.row}>
          <div className={styles.label}>
            <img src="/Order/shop1.png" alt="" />
            Pedido
          </div>
          <span>${totalPedido}</span>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>
            <img src="/Order/shop2.png" alt="" />
            Envío
          </div>
          <span>{envio === 0 ? "GRATIS" : `$${envio}`}</span>
        </div>

        <div className={`${styles.row} ${styles.total}`}>
          <span>Total</span>
          <span>${totalFinal}</span>
        </div>
      </div>

      {/* CTA */}
      {!checkoutStarted && (
        <button
          className={styles.cta}
          disabled={!isMinReached}
          onClick={() => {
            onStartCheckout(); // cierra overlay (Order)
            startCheckout(); // inicia checkout (Steps)
          }}
        >
          PROCEDER AL PAGO
        </button>
      )}
    </footer>
  );
}
