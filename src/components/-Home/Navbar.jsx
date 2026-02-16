// Navbar.jsx (renovado: sin X, drawer simple y fácil de estilizar)
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import styles from "./Navbar.module.css";

export default function Navbar({ onLoginClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.scrollY ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;

      setScrolled(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleGoToPedir = () => {
    navigate("/pedir");
    setMenuOpen(false);
  };

  const closeDrawer = () => setMenuOpen(false);

  const handleDrawerLogin = () => {
    closeDrawer();
    onLoginClick?.();
  };

  return (
    <>
      <nav
        className={`${styles.navbar} ${
          scrolled ? styles.navbarScrolled : styles.navbarTop
        }`}
      >
        <div className={styles.inner}>
          {/* IZQUIERDA */}
          <div className={styles.left}>
            {/* REDES DESKTOP */}
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
                <svg viewBox="0 0 24 24" className={styles.socialIcon}>
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
                </svg>
              </a>

              <a
                href="https://www.instagram.com/viandashoteldelprado"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <svg viewBox="0 0 24 24" className={styles.socialIcon}>
                  <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
                </svg>
              </a>

              <a
                href="https://api.whatsapp.com/send?phone=59892381484"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
              >
                <svg viewBox="0 0 24 24" className={styles.socialIcon}>
                  <path d="M16.75 13.96c.25.13.41.2.46.3.06.11.04.61-.21 1.18-.2.56-1.24 1.1-1.7 1.12-.46.02-.47.36-2.96-.73-2.49-1.09-3.99-3.75-4.11-3.92-.12-.17-.96-1.38-.92-2.61.05-1.22.69-1.8.95-2.04.24-.26.51-.29.68-.26h.47c.15 0 .36-.06.55.45l.69 1.87c.06.13.1.28.01.44l-.27.41-.39.42c-.12.12-.26.25-.12.5.12.26.62 1.09 1.32 1.78.91.88 1.71 1.17 1.95 1.3.24.14.39.12.54-.04l.81-.94c.19-.25.35-.19.58-.11l1.67.88M12 2a10 10 0 0 1 10 10 10 10 0 0 1-10 10c-1.97 0-3.8-.57-5.35-1.55L2 22l1.55-4.65A9.969 9.969 0 0 1 2 12 10 10 0 0 1 12 2m0 2a8 8 0 0 0-8 8c0 1.72.54 3.31 1.46 4.61L4.5 19.5l2.89-.96A7.95 7.95 0 0 0 12 20a8 8 0 0 0 8-8 8 8 0 0 0-8-8z" />
                </svg>
              </a>
            </div>

            {/* HAMBURGUESA */}
            <button
              className={styles.menuBtn}
              onClick={() => setMenuOpen(true)}
              aria-label="Abrir menú"
            >
              <FiMenu />
            </button>
          </div>

          {/* LOGO */}
          <div className={styles.logoWrapper}>
            <img
              src={scrolled ? "/Logo/logoblack.svg" : "/Logo/logowhite.svg"}
              alt="Viandas Hotel del Prado"
              className={styles.logo}
            />
          </div>

          {/* ACCIONES */}
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
        </div>
      </nav>

      {/* OVERLAY */}
      {menuOpen && (
        <div
          className={styles.overlay}
          onClick={closeDrawer}
          aria-hidden="true"
        />
      )}

      {/* DRAWER */}
      <aside
        className={`${styles.drawer} ${menuOpen ? styles.drawerOpen : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menú"
      >
        <div className={styles.drawerInner}>
          <button className={styles.drawerLoginBtn} onClick={handleDrawerLogin}>
            INICIAR SESIÓN
          </button>

          <div className={styles.drawerSocials}>
            <a
              href="https://www.facebook.com/ViandasHoteldelPrado/#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className={styles.drawerSocialLink}
            >
              <svg viewBox="0 0 24 24" className={styles.drawerSocialIcon}>
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
              </svg>
            </a>

            <a
              href="https://www.instagram.com/viandashoteldelprado"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className={styles.drawerSocialLink}
            >
              <svg viewBox="0 0 24 24" className={styles.drawerSocialIcon}>
                <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
              </svg>
            </a>

            <a
              href="https://api.whatsapp.com/send?phone=59892381484"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className={styles.drawerSocialLink}
            >
              <svg viewBox="0 0 24 24" className={styles.drawerSocialIcon}>
                <path d="M16.75 13.96c.25.13.41.2.46.3.06.11.04.61-.21 1.18-.2.56-1.24 1.1-1.7 1.12-.46.02-.47.36-2.96-.73-2.49-1.09-3.99-3.75-4.11-3.92-.12-.17-.96-1.38-.92-2.61.05-1.22.69-1.8.95-2.04.24-.26.51-.29.68-.26h.47c.15 0 .36-.06.55.45l.69 1.87c.06.13.1.28.01.44l-.27.41-.39.42c-.12.12-.26.25-.12.5.12.26.62 1.09 1.32 1.78.91.88 1.71 1.17 1.95 1.3.24.14.39.12.54-.04l.81-.94c.19-.25.35-.19.58-.11l1.67.88M12 2a10 10 0 0 1 10 10 10 10 0 0 1-10 10c-1.97 0-3.8-.57-5.35-1.55L2 22l1.55-4.65A9.969 9.969 0 0 1 2 12 10 10 0 0 1 12 2m0 2a8 8 0 0 0-8 8c0 1.72.54 3.31 1.46 4.61L4.5 19.5l2.89-.96A7.95 7.95 0 0 0 12 20a8 8 0 0 0 8-8 8 8 0 0 0-8-8z" />
              </svg>
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}
