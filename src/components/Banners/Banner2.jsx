import styles from "./Banner2.module.css";

export default function Banner2() {
  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        {/* IZQUIERDA */}
        <div className={styles.imageBox}>
          <img src="/Banners/hero2.webp" alt="Comida fresca" />
        </div>

        {/* DERECHA */}
        <div className={styles.content}>
          <h2>
            Tu comida, siempre fresca.
            <br />
            Nunca congelada.
          </h2>

          <div className={styles.features}>
            {/* FEATURE 1 (ajuste específico) */}
            <div className={`${styles.feature} ${styles.featureFirst}`}>
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
