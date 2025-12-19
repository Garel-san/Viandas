import styles from "./OrderHeader.module.css";

export default function OrderHeader({ totalViandas }) {
  return (
    <header className={styles.header}>
      <h2 className={styles.title}>Tu pedido</h2>
      <span className={styles.subtitle}>
        {totalViandas} {totalViandas === 1 ? "vianda" : "viandas"}
      </span>
    </header>
  );
}
