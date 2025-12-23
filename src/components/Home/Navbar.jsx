import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";
import styles from "./Navbar.module.css";

export default function Navbar({ onLoginClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // ⬅️ NUEVO
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleGoToPedir = () => {
    navigate("/pedir");
    setMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`${styles.navbar} ${
          scrolled ? styles.navbarScrolled : styles.navbarTop
        }`}
      >
        {/* IZQUIERDA - REDES / HAMBURGER */}
        <div className={styles.left}>
          {/* Redes (desktop) */}
          <div
            className={`${styles.socials} ${
              scrolled ? styles.socialsScrolled : styles.socialsTop
            }`}
          >
            <a
              href="https://www.facebook.com/ViandasHoteldelPrado/#"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://www.instagram.com/viandashoteldelprado"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
            <a
              href="https://api.whatsapp.com/send?phone=59892381484"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp />
            </a>
          </div>

          {/* Hamburger (mobile) */}
          <button
            className={styles.menuBtn}
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menú"
          >
            <FiMenu />
          </button>
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
            onClick={onLoginClick}
          >
            INICIAR SESIÓN
          </button>

          <button className={styles.orderBtn} onClick={handleGoToPedir}>
            HACER PEDIDO
          </button>
        </div>
      </nav>

      {/* OVERLAY MOBILE */}
      {menuOpen && (
        <div className={styles.overlay} onClick={() => setMenuOpen(false)} />
      )}

      {/* DRAWER MOBILE */}
      <aside
        className={`${styles.drawer} ${menuOpen ? styles.drawerOpen : ""}`}
      >
        <button className={styles.closeBtn} onClick={() => setMenuOpen(false)}>
          <FiX />
        </button>

        <button
          className={styles.drawerLogin}
          onClick={() => {
            setMenuOpen(false);
            onLoginClick();
          }}
        >
          INICIAR SESIÓN
        </button>

        <div className={styles.drawerSocials}>
          <a
            href="https://www.facebook.com/ViandasHoteldelPrado/#"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://www.instagram.com/viandashoteldelprado"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </a>
          <a
            href="https://api.whatsapp.com/send?phone=59892381484"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsapp />
          </a>
        </div>
      </aside>
    </>
  );
}
