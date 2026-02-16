import styles from "./Banner1.module.css";

export default function Banner1() {
  return (
    <section className={styles.bannerWrapper}>
      <div className={styles.primercajaHijo}>
        <div className={styles.tarjeta}>
          <img src="/Banners/clickmenu.png" alt="Elegí tus platos" />
          <p className={styles.tarjetaHeader}>Elegí tus platos</p>
          <p className={styles.tarjetaSlogan}>
            Cientos de combinaciones posibles entre platos principales y
            guarniciones que atienden todas las dietas.
          </p>
        </div>

        <div className={styles.tarjeta}>
          <img src="/Banners/orderman.png" alt="Cocinamos y entregamos" />
          <p className={styles.tarjetaHeader}>Cocinamos y entregamos</p>
          <p className={styles.tarjetaSlogan}>
            Nuestros chefs elaboran tu comida y te enviamos todo fresco en
            bandejas porcionadas, el día de tu preferencia.
          </p>
        </div>

        <div className={styles.tarjeta}>
          <img src="/Banners/microwave.png" alt="Calentá, disfrutá y repetí" />
          <p className={styles.tarjetaHeader}>Calentá, disfrutá y repetí</p>
          <p className={styles.tarjetaSlogan}>
            Al micro 2 minutos y está listo. Disfrutá de tus comidas semanales,
            pudiendo saltearte o cancelar cuando quieras.
          </p>
        </div>
      </div>
    </section>
  );
}
