import styles from "./Banner1.module.css";

export default function Banner1() {
  return (
    <section className={styles.bannerWrapper}>
      <div className={styles.banner}>
        <div className={styles.item}>
          <img src="/Banners/clickmenu.png" alt="Elegí tus platos" />
          <h3>Elegí tus platos</h3>
          <p>
            Cientos de combinaciones posibles entre platos principales y
            guarniciones que atienden todas las dietas.
          </p>
        </div>

        <div className={styles.item}>
          <img src="/Banners/orderman.png" alt="Cocinamos y entregamos" />
          <h3>Cocinamos y entregamos</h3>
          <p>
            Nuestros chefs elaboran tu comida y te enviamos todo fresco en
            bandejas porcionadas, el día de tu preferencia.
          </p>
        </div>

        <div className={styles.item}>
          <img src="/Banners/microwave.png" alt="Calentá, disfrutá y repetí" />
          <h3>Calentá, disfrutá y repetí</h3>
          <p>
            Al micro 2 minutos y está listo. Disfrutá de tus comidas semanales,
            pudiendo saltearte o cancelar cuando quieras.
          </p>
        </div>
      </div>
    </section>
  );
}
