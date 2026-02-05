import { useRef } from "react";
import styles from "./SuccessSummary.module.css";

export default function SuccessSummary({
  guest,
  delivery,
  payment,
  result,
  orderItems,
  total,
  onNewOrder,
  onGoHome,
}) {
  const sliderRef = useRef(null);

  if (!result?.id) {
    return (
      <section className={styles.wrapper}>
        <h2 className={styles.title}>Pedido no disponible</h2>
        <p className={styles.subtitle}>
          No se encontró información del pedido.
        </p>
      </section>
    );
  }

  const scrollLeft = () => {
    sliderRef.current?.scrollBy({ left: -260, behavior: "smooth" });
  };

  const scrollRight = () => {
    sliderRef.current?.scrollBy({ left: 260, behavior: "smooth" });
  };

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
        Tu pedido ID <strong>#{result.id}</strong> ya está activo.
        <br />
        Este es un resumen de lo que recibirás:
      </p>

      {/* ================== PRODUCTOS (SLIDER) ================== */}
      <div className={styles.productsSliderWrapper}>
        <div className={styles.productsSliderViewport}>
          {orderItems.length > 1 && (
            <button
              type="button"
              className={styles.sliderButtonLeft}
              onClick={scrollLeft}
              aria-label="Ver productos anteriores"
            >
              ‹
            </button>
          )}

          <div className={styles.productsSlider} ref={sliderRef}>
            {orderItems.map((item) => (
              <div
                key={`${item.productId}-${item.size}-${item.garnishId}`}
                className={styles.productCard}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className={styles.productImage}
                />

                <div className={styles.productInfo}>
                  <p className={styles.productTitle}>{item.title}</p>

                  <div className={styles.productMetaGroup}>
                    <span className={styles.productMeta}>
                      Tamaño: {item.size}
                    </span>
                    <span className={styles.productMeta}>
                      Cantidad: {item.quantity}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {orderItems.length > 1 && (
            <button
              type="button"
              className={styles.sliderButtonRight}
              onClick={scrollRight}
              aria-label="Ver productos siguientes"
            >
              ›
            </button>
          )}
        </div>
      </div>

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

      {/* ACTIONS (ahora acá) */}
      <div className={styles.actions}>
        <button
          type="button"
          className={styles.primaryBtn}
          onClick={onNewOrder}
        >
          IR A MI PERFIL
        </button>

        <button
          type="button"
          className={styles.secondaryBtn}
          onClick={onGoHome}
        >
          VOLVER AL INICIO
        </button>
      </div>
    </section>
  );
}
