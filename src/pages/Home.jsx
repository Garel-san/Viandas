import { useNavigate } from "react-router-dom";

import Layout from "../components/-Home/Layout";
import Banner1 from "../components/-Home/Banners/Banner1";
import Carrousel from "../components/-Home/Carrousel";
import Banner2 from "../components/-Home/Banners/Banner2";
import Reviews from "../components/-Home/Reviews";
import DietSelector from "../components/-Home/Dietas";
import FaqAccordion from "../components/-Home/PreguntasFrecuentes";
import Banner3 from "../components/-Home/Banners/Banner3";
import Footer from "../components/-Home/Footer";

import styles from "./Home.module.css";

export default function Home() {
  const navigate = useNavigate();

  const handleGoToPedir = () => {
    navigate("/pedir");
  };

  return (
    <Layout>
      <main className={styles.home}>
        {/* ======================
            HERO
        ====================== */}
        <section className={styles.heroSection}>
          <div className={styles.heroInner}>
            <div className={styles.heroContent}>
              <p className={styles.heroHeader}>
                Tu semana se acaba de volver más práctica y deliciosa.
              </p>

              <p className={styles.heroSlogan}>
                Recibí nuestras porciones semanales de comida fresca en tu casa
                o trabajo.
              </p>

              <button className={styles.ctaButton} onClick={handleGoToPedir}>
                HACER PEDIDO
              </button>
            </div>
          </div>
        </section>

        {/* ======================
            BANNER 1
        ====================== */}
        <section className={styles.banner1Section}>
          <div className={styles.banner1Inner}>
            <Banner1 />
          </div>
        </section>

        {/* ==========================
    COMBINACIONES + CAROUSEL
========================== */}
        <section className={styles.carouselSection}>
          <div className={styles.carouselRow}>
            {/* COLUMNA IZQUIERDA */}
            <div className={styles.carouselText}>
              <h2 className={styles.carouselTitle}>
                Más de 200 combinaciones posibles de platos y guarniciones.
              </h2>

              <p className={styles.carouselSubtitle}>
                No importa si sos vegetariano, tenés dietas restrictivas o un
                deportista de élite: vas a encontrar algo para vos.
              </p>
            </div>

            {/* COLUsMNA DERECHA */}
            <div className={styles.carouselContent}>
              <Carrousel />
            </div>
          </div>
        </section>

        {/* ======================
            BANNER 2
        ====================== */}
        <section className={styles.banner2Section}>
          <div className={styles.banner2Wrapper}>
            <Banner2 />
          </div>
        </section>

        {/* ======================
            REVIEWS
        ====================== */}
        <section className={styles.reviewsSection}>
          <div className={styles.reviewsWrapper}>
            <Reviews />
          </div>
        </section>

        {/* ======================
    DIET SELECTOR
====================== */}
        <section className={styles.dietSection}>
          {/* Texto principal */}
          <div>
            <p className={styles.dietTitle}>Nutrición para todas las dietas</p>
          </div>

          {/* Subtítulo */}
          <div>
            <p className={styles.dietSubtitle}>
              No importa si sos vegetariano, tenés dietas restrictivas o un
              deportista de élite: vas a encontrar algo para vos.
            </p>
          </div>

          {/* Botones + contenido (por ahora en componente aparte) */}
          <div className={styles.dietSelectorWrapper}>
            <DietSelector />
          </div>
        </section>

        {/* ======================
            FAQ
        ====================== */}
        <section className={styles.faqSection}>
          <div className={styles.faqWrapper}>
            <FaqAccordion />
          </div>
        </section>

        {/* ======================
            BANNER 3
        ====================== */}
        <section className={styles.banner3Section}>
          <div className={styles.banner3Wrapper}>
            <Banner3 />
          </div>
        </section>

        <Footer />
      </main>
    </Layout>
  );
}
