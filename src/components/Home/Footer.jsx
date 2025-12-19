import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <span className={styles.text}>
        © Viandas Hotel del Prado. Hecho con amor por RUFFi
      </span>

      <div className={styles.socials}>
        <a
          href="https://www.facebook.com/ViandasHoteldelPrado/#"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
        >
          <FaFacebookF />
        </a>

        <a
          href="https://www.instagram.com/viandashoteldelprado"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
        >
          <FaInstagram />
        </a>

        <a
          href="https://api.whatsapp.com/send?phone=59892381484"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
        >
          <FaWhatsapp />
        </a>
      </div>
    </footer>
  );
}
