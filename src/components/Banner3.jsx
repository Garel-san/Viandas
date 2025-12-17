import styles from "./Banner3.module.css";

export default function Banner3() {
  return (
    <section className={styles.banner}>
      <div className={styles.inner}>
        <div className={styles.textBlock}>
          <h2 className={styles.title}>Ya te dió hambre?</h2>

          <p className={styles.subtitle}>
            No pierdas más tiempo y comenzá una nueva vida donde cocinás menos y
            disfrutas más.
          </p>
        </div>

        <button className={styles.button}>HACER MI PEDIDO</button>
      </div>
    </section>
  );
}
