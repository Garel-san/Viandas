import styles from "./OrderFooter.module.css";
import { useCheckout } from "../../../context/CheckoutContext";

export default function OrderFooter({
  totalPedido,
  envio,
  totalFinal,
  faltantesParaMinimo,
  isMinReached,
  onStartCheckout,
}) {
  const { startCheckout, checkoutStarted } = useCheckout();

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
          <div className={styles.leftText}>
            <img className={styles.icon} src="/Order/shop1.png" alt="" />
            <span className={styles.labelText}>Pedido</span>
          </div>

          <span className={styles.rightText}>${totalPedido}</span>
        </div>

        <div className={styles.row}>
          <div className={styles.leftText}>
            <img className={styles.icon} src="/Order/shop2.png" alt="" />
            <span className={styles.labelText}>Envío</span>
          </div>

          <span className={styles.rightText}>
            {envio === 0 ? "GRATIS" : `$${envio}`}
          </span>
        </div>

        <div className={`${styles.row} ${styles.totalRow}`}>
          <span className={styles.leftText}>Total</span>
          <span className={`${styles.rightText} ${styles.totalValue}`}>
            ${totalFinal}
          </span>
        </div>
      </div>

      {/* CTA */}
      {!checkoutStarted && (
        <button
          className={styles.cta}
          disabled={!isMinReached}
          onClick={() => {
            onStartCheckout();
            startCheckout();
          }}
        >
          PROCEDER AL PAGO
        </button>
      )}
    </footer>
  );
}
