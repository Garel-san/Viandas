import { useNavigate } from "react-router-dom";
import styles from "./Banner3.module.css";

export default function Banner3() {
  const navigate = useNavigate();

  const handleGoToPedir = () => {
    navigate("/pedir");
  };

  return (
    <section className={styles.bannerHeroBox}>
      <div className={styles.bannerHeroChild}>
        <div className={styles.bannerTextBox}>
          <h2 className={styles.title}>
            Ya te dió hambre
            <span className={styles.questionMark}>?</span>
          </h2>

          <p className={styles.subtitle}>
            No pierdas más tiempo y comenzá una nueva vida donde cocinás menos y
            disfrutás más.
          </p>
        </div>

        <button className={styles.ctaButton} onClick={handleGoToPedir}>
          HACER MI PEDIDO
        </button>
      </div>
    </section>
  );
}
