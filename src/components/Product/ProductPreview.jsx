import { useState } from "react";
import { FiPlus, FiStar } from "react-icons/fi";
import styles from "./ProductPreview.module.css";

export default function ProductPreview({ product, onAdd }) {
  const { title, image, basePrice } = product;
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <article className={styles.card}>
      {/* Imagen */}
      <div className={styles.imageWrapper}>
        <img src={image} alt={title} className={styles.image} />

        {/* Precio */}
        <span className={styles.price}>${basePrice}</span>

        {/* Favorito */}
        <button
          className={styles.favoriteBtn}
          onClick={() => setIsFavorite((v) => !v)}
          aria-label="Marcar como favorito"
        >
          <FiStar className={isFavorite ? styles.starActive : styles.star} />
        </button>
      </div>

      {/* BOTÓN + FLOTANTE (FUERA DE imageWrapper) */}
      <button className={styles.addFloatingBtn} onClick={onAdd}>
        <FiPlus />
      </button>

      {/* Footer SOLO con título */}
      <div className={styles.footer}>
        <h3 className={styles.title}>{title}</h3>
      </div>
    </article>
  );
}
