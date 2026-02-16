import { useState, useMemo, useEffect } from "react";
import styles from "./ProductConfigurator.module.css";
import { useOrder } from "../../../context/OrderDataContext";
import { FiChevronDown, FiCheck, FiX } from "react-icons/fi";

export default function ProductConfigurator({ product, onCancel }) {
  const { addItem } = useOrder();

  const [isMobile, setIsMobile] = useState(
    window.matchMedia("(max-width: 665px)").matches,
  );

  useEffect(() => {
    const media = window.matchMedia("(max-width: 665px)");
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

  // ✅ undefined = no eligió todavía (bloquea el botón)
  // ✅ null = "Sin guarnición" (válido, habilita el botón)
  const [garnishId, setGarnishId] = useState(undefined);

  const [openGarnish, setOpenGarnish] = useState(false);

  const selectedGarnish = useMemo(() => {
    if (garnishId == null) return null; // null = sin guarnición (válido)
    return garnishes.find((g) => String(g.id) === String(garnishId));
  }, [garnishes, garnishId]);

  const totalPrice = useMemo(() => {
    let total = basePrice * quantity;
    if (size === "XL") total += basePrice * 0.5 * quantity;

    const garnishExtra = selectedGarnish?.extra || 0;
    return total + garnishExtra * quantity;
  }, [basePrice, size, quantity, selectedGarnish]);

  const handleConfirm = () => {
    // ❌ solo bloquea si todavía no eligió nada
    if (typeof garnishId === "undefined") return;

    addItem({
      productId: id,
      title,
      image,
      size,
      garnishId: selectedGarnish?.id || null,
      garnishLabel:
        garnishId === null ? "Sin guarnición" : selectedGarnish?.label || null,
      garnishExtra: selectedGarnish?.extra || 0,
      unitPrice: basePrice,
      quantity,
    });

    onCancel();
  };

  const handleClearGarnish = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setGarnishId(undefined); // ✅ vuelve a "no seleccionado"
    setOpenGarnish(false);
  };

  const headerLabel =
    typeof garnishId === "undefined"
      ? "Guarnición del plato"
      : garnishId === null
        ? "Sin guarnición"
        : selectedGarnish?.label || "Guarnición del plato";

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
              type="button"
            >
              M
            </button>

            {allowsXL && (
              <button
                className={size === "XL" ? styles.active : ""}
                onClick={() => setSize("XL")}
                type="button"
              >
                XL
              </button>
            )}
          </div>
        </div>

        <div className={styles.col}>
          <p className={styles.labelCentered}>Cant.</p>
          <div className={styles.qtyControls}>
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              type="button"
            >
              −
            </button>
            <span className={styles.qty}>{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)} type="button">
              +
            </button>
          </div>
        </div>
      </div>

      {/* Guarnición */}
      <div className={styles.dropdown}>
        <button
          className={styles.dropdownHeader}
          onClick={() => setOpenGarnish((v) => !v)}
          type="button"
        >
          <span className={styles.dropdownLabel}>{headerLabel}</span>

          <span className={styles.rightControls}>
            {/* ✅ mostrar X solo si ya eligió algo (incluye "Sin guarnición") */}
            {typeof garnishId !== "undefined" && (
              <button
                className={styles.clearBtn}
                type="button"
                aria-label="Quitar guarnición"
                onClick={handleClearGarnish}
              >
                <FiX />
              </button>
            )}
            <FiChevronDown className={styles.chevronIcon} />
          </span>
        </button>

        {openGarnish && (
          <div className={styles.dropdownList}>
            {/* ✅ "Sin guarnición" es una selección válida (null) */}
            <div
              className={`${styles.option} ${
                garnishId === null ? styles.selected : ""
              }`}
              onClick={() => {
                setGarnishId(null);
                setOpenGarnish(false);
              }}
              role="button"
              tabIndex={0}
            >
              <span>Sin guarnición</span>
              {garnishId === null && <FiCheck className={styles.optionCheck} />}
            </div>

            {garnishes.map((g) => (
              <div
                key={g.id}
                className={`${styles.option} ${
                  String(g.id) === String(garnishId) ? styles.selected : ""
                }`}
                onClick={() => {
                  setGarnishId(g.id);
                  setOpenGarnish(false);
                }}
                role="button"
                tabIndex={0}
              >
                <span>{g.label}</span>
                {String(g.id) === String(garnishId) && (
                  <FiCheck className={styles.optionCheck} />
                )}
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
        <button className={styles.cancel} onClick={onCancel} type="button">
          Volver
        </button>

        <button
          className={styles.confirm}
          // ✅ habilita si eligió una guarnición o "Sin guarnición"
          disabled={typeof garnishId === "undefined"}
          onClick={handleConfirm}
          type="button"
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
