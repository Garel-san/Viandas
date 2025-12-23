import { useState, useMemo, useEffect } from "react";
import styles from "./ProductConfigurator.module.css";
import { useOrder } from "../../context/OrderDataContext";
import { FiChevronDown, FiCheck } from "react-icons/fi";

export default function ProductConfigurator({ product, onCancel }) {
  const { addItem } = useOrder();

  /* ==========================
     BREAKPOINT
  ========================== */
  const [isMobile, setIsMobile] = useState(
    window.matchMedia("(max-width: 1023px)").matches
  );

  useEffect(() => {
    const media = window.matchMedia("(max-width: 1023px)");
    const listener = () => setIsMobile(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  /* ==========================
     BLOQUEO SCROLL (SOLO MOBILE)
  ========================== */
  useEffect(() => {
    if (!isMobile) return;

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobile]);

  const {
    id,
    title,
    image,
    basePrice,
    allowsXL = false,
    garnishes = [],
  } = product;

  const [size, setSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const [garnishId, setGarnishId] = useState(null);
  const [openGarnish, setOpenGarnish] = useState(false);

  const totalPrice = useMemo(() => {
    let total = basePrice * quantity;
    if (size === "XL") total += basePrice * 0.5 * quantity;
    const garnishExtra = garnishes.find((g) => g.id === garnishId)?.extra || 0;
    return total + garnishExtra * quantity;
  }, [basePrice, size, quantity, garnishId, garnishes]);

  const handleConfirm = () => {
    const garnish = garnishes.find((g) => g.id === garnishId);

    addItem({
      productId: id,
      title,
      image,
      size,
      garnishId: garnish?.id || null,
      garnishLabel: garnish?.label || null,
      garnishExtra: garnish?.extra || 0,
      unitPrice: basePrice,
      quantity,
    });

    onCancel();
  };

  /* ==========================
     CONTENIDO REUTILIZABLE
  ========================== */
  const content = (
    <>
      <p className={styles.info}>*XL admite 2 guarniciones</p>

      {/* Tamaño + Cantidad */}
      <div className={styles.row}>
        <div>
          <p className={styles.label}>Tamaño</p>
          <div className={styles.pills}>
            <button
              className={size === "M" ? styles.active : ""}
              onClick={() => setSize("M")}
            >
              M
            </button>

            {allowsXL && (
              <button
                className={size === "XL" ? styles.active : ""}
                onClick={() => setSize("XL")}
              >
                XL
              </button>
            )}
          </div>
        </div>

        <div>
          <p className={styles.label}>Cant.</p>
          <div className={styles.qtyControls}>
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
              −
            </button>
            <span className={styles.qty}>{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)}>+</button>
          </div>
        </div>
      </div>

      {/* Guarnición */}
      <div className={styles.dropdown}>
        <button
          className={styles.dropdownHeader}
          onClick={() => setOpenGarnish((v) => !v)}
        >
          <span>
            {garnishes.find((g) => g.id === garnishId)?.label ||
              "Guarnición del plato"}
          </span>
          <FiChevronDown />
        </button>

        {openGarnish && (
          <div className={styles.dropdownList}>
            {garnishes.map((g) => (
              <div
                key={g.id}
                className={`${styles.option} ${
                  garnishId === g.id ? styles.selected : ""
                }`}
                onClick={() => {
                  setGarnishId(g.id);
                  setOpenGarnish(false);
                }}
              >
                <span>{g.label}</span>
                {garnishId === g.id && <FiCheck />}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Total */}
      <div className={styles.total}>
        <span>Total:</span>
        <strong>${totalPrice}</strong>
      </div>

      {/* Acciones */}
      <div className={styles.actions}>
        <button className={styles.cancel} onClick={onCancel}>
          Volver
        </button>

        <button
          className={styles.confirm}
          disabled={!quantity}
          onClick={handleConfirm}
        >
          AÑADIR +
        </button>
      </div>
    </>
  );

  /* ==========================
     RENDER FINAL
  ========================== */
  return isMobile ? (
    <div className={styles.overlay} onClick={onCancel}>
      <section className={styles.card} onClick={(e) => e.stopPropagation()}>
        {content}
      </section>
    </div>
  ) : (
    <section className={styles.cardDesktop}>{content}</section>
  );
}
