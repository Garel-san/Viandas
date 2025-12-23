import styles from "./OrderFooter.module.css";

export default function OrderFooter({
  totalPedido,
  envio,
  totalFinal,
  faltantesParaMinimo,
  isMinReached,
  onStartCheckout,
}) {
  return (
    <footer className={styles.footer}>
      {/* Mensaje mínimo */}
      {!isMinReached && (
        <div className={styles.notice}>
          Elegí {faltantesParaMinimo}{" "}
          {faltantesParaMinimo === 1 ? "plato" : "platos"} más para continuar
        </div>
      )}

      {/* Totales */}
      <div className={styles.summary}>
        <div className={styles.row}>
          <div className={styles.label}>
            <img src="/shop1.png" alt="" />
            Pedido
          </div>
          <span>${totalPedido}</span>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>
            <img src="/shop2.png" alt="" />
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
      <button
        className={styles.cta}
        disabled={!isMinReached}
        onClick={onStartCheckout}
      >
        PROCEDER AL PAGO
      </button>
    </footer>
  );
}
