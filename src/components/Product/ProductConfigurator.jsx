import { useState, useMemo, useEffect } from "react";
import styles from "./ProductConfigurator.module.css";
import { useOrder } from "../../context/OrderDataContext";
import { FiChevronDown, FiCheck } from "react-icons/fi";

export default function ProductConfigurator({ product, onCancel }) {
  const { addItem } = useOrder();

  const [isMobile, setIsMobile] = useState(
    window.matchMedia("(max-width: 1023px)").matches
  );

  useEffect(() => {
    const media = window.matchMedia("(max-width: 1023px)");
    const listener = () => setIsMobile(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  useEffect(() => {
    if (!isMobile) return;
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "");
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
    if (garnishId === null) return;

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

  const content = (
    <>
      {/* INFO XL */}
      <p className={styles.info}>*XL admite 2 guarniciones</p>

      {/* Tamaño + Cantidad */}
      <div className={styles.row}>
        <div className={styles.col}>
          <p className={styles.labelCentered}>Tamaño</p>
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

        <div className={styles.col}>
          <p className={styles.labelCentered}>Cant.</p>
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
            <div
              className={`${styles.option} ${
                garnishId === null ? styles.selected : ""
              }`}
              onClick={() => {
                setGarnishId(null);
                setOpenGarnish(false);
              }}
            >
              <span>Sin guarnición</span>
              {garnishId === null && <FiCheck />}
            </div>

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
        <div>
          <span className={styles.currency}>$</span>
          <strong>{totalPrice}</strong>
        </div>
      </div>

      {/* Acciones */}
      <div className={styles.actions}>
        <button className={styles.cancel} onClick={onCancel}>
          Volver
        </button>

        <button
          className={styles.confirm}
          disabled={garnishId === null}
          onClick={handleConfirm}
        >
          AÑADIR +
        </button>
      </div>
    </>
  );

  return isMobile ? (
    <div className={styles.overlay} onClick={onCancel}>
      <section className={styles.card} onClick={(e) => e.stopPropagation()}>
        {/* TÍTULO SOLO EN MOBILE */}
        <h3 className={styles.title}>{title}</h3>

        {content}
      </section>
    </div>
  ) : (
    <section className={styles.cardDesktop}>{content}</section>
  );
}
