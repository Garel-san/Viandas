import styles from "./Banner2.module.css";

export default function Banner2() {
  return (
    <section className={styles.section}>
      <div className={styles.banner}>
        {/* COLUMNA IZQUIERDA – IMAGEN */}
        <div className={styles.imageWrapper}>
          <img
            src="/Banners/hero2.webp"
            alt="Comida fresca"
            className={styles.image}
          />
        </div>

        {/* COLUMNA DERECHA – CONTENIDO */}
        <div className={styles.content}>
          <div className={styles.header}>
            <h2 className={styles.title}>
              Tu comida,
              <br />
              siempre fresca.
            </h2>
            <h2 className={styles.title}>Nunca congelada.</h2>
          </div>

          <div className={styles.features}>
            <div className={styles.feature}>
              <img src="/Banners/tray.png" alt="" />
              <p>
                Nuestro envasado de alta tecnología mantiene tu comida fresca en
                heladera por hasta 10 días.
              </p>
            </div>

            <div className={styles.feature}>
              <img src="/Banners/additive.png" alt="" />
              <p>Preparaciones cuidadas, sin agregados innecesarios.</p>
            </div>

            <div className={styles.feature}>
              <img src="/Banners/chef.png" alt="" />
              <p>Comida hecha por chefs usando ingredientes de alta calidad.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
