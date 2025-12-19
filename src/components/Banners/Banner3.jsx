import { useNavigate } from "react-router-dom";
import styles from "./Banner3.module.css";

export default function Banner3() {
  const navigate = useNavigate();

  const handleGoToPedir = () => {
    navigate("/pedir");
  };

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

        <button className={styles.button} onClick={handleGoToPedir}>
          HACER MI PEDIDO
        </button>
      </div>
    </section>
  );
}
