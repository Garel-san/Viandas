import { useEffect, useState } from "react";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import styles from "./Navbar.module.css";

export default function Navbar({ onLoginClick }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`${styles.navbar} ${
        scrolled ? styles.navbarScrolled : styles.navbarTop
      }`}
    >
      {/* IZQUIERDA - REDES */}
      <div
        className={`${styles.socials} ${
          scrolled ? styles.socialsScrolled : styles.socialsTop
        }`}
      >
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

      {/* CENTRO - LOGO */}
      <div className={styles.logoWrapper}>
        <img
          src={scrolled ? "/logoblack.svg" : "/logowhite.svg"}
          alt="Viandas Hotel del Prado"
          className={styles.logo}
        />
      </div>

      {/* DERECHA - BOTONES */}
      <div className={styles.actions}>
        <button
          className={`${styles.loginBtn} ${
            scrolled ? styles.loginBtnScrolled : styles.loginBtnTop
          }`}
          onClick={onLoginClick} // ← CAMBIO CLAVE
        >
          INICIAR SESIÓN
        </button>

        <button className={styles.orderBtn}>HACER PEDIDO</button>
      </div>
    </nav>
  );
}
