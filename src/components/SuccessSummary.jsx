import styles from "./SuccessSummary.module.css";
import { useCheckout } from "../context/CheckoutContext";
import { useOrder } from "../context/OrderDataContext";

export default function SuccessSummary() {
  const { guest, delivery, payment, result } = useCheckout();
  const { orderItems, total } = useOrder();

  if (!result.orderId) return null;

  return (
    <section className={styles.wrapper}>
      {/* HEADER */}
      <div className={styles.header}>
        <div className={styles.check}>✓</div>
        <h2 className={styles.title}>
          Tu pedido ha sido creado con éxito, {guest.fullName}
        </h2>
      </div>

      <p className={styles.subtitle}>
        Tu pedido ID <strong>#{result.orderId}</strong> ya está activo.
        <br />
        Este es un resumen de lo que recibirás:
      </p>

      {/* PRODUCTOS */}
      {orderItems.map((item) => (
        <div key={item.productId} className={styles.productCard}>
          <img
            src={item.image}
            alt={item.title}
            className={styles.productImage}
          />

          <div className={styles.productInfo}>
            <p className={styles.productTitle}>{item.title}</p>
            <p className={styles.productMeta}>Tamaño: {item.size}</p>
            <p className={styles.productMeta}>Cantidad: {item.quantity}</p>
          </div>
        </div>
      ))}

      {/* INFO */}
      <div className={styles.infoList}>
        <div className={styles.infoItem}>
          ⏱ Tu entrega está agendada para{" "}
          <span className={styles.highlight}>
            {delivery.date?.toLocaleDateString()}
          </span>
        </div>

        <div className={styles.infoItem}>
          📦 Recibirás tu paquete en{" "}
          <span className={styles.highlight}>
            {delivery.mode === "pickup"
              ? "Retiro en local"
              : `${delivery.address.street} ${delivery.address.number}`}
          </span>
        </div>

        <div className={styles.infoItem}>
          💰 Cobraremos <span className={styles.highlight}>${total}</span>{" "}
          {payment.method === "cash"
            ? "en efectivo"
            : payment.method === "pos"
            ? "con POS"
            : "con tarjeta"}{" "}
          al momento de la entrega
        </div>
      </div>

      {/* ACTIONS */}
      <div className={styles.actions}>
        <button className={styles.primaryBtn}>IR A MI PERFIL</button>
        <button className={styles.secondaryBtn}>VOLVER AL INICIO</button>
      </div>
    </section>
  );
}
