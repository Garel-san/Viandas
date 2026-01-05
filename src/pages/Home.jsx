import { useNavigate } from "react-router-dom";

import Layout from "../components/Layout";
import Banner1 from "../components/Banners/Banner1";
import Carrousel from "../components/Home/Carrousel";
import Banner2 from "../components/Banners/Banner2";
import Reviews from "../components/Home/Reviews";
import DietSelector from "../components/Home/DietSelector";
import FaqAccordion from "../components/Home/FaqAccordion";
import Banner3 from "../components/Banners/Banner3";
import Footer from "../components/Home/Footer";

import styles from "./Home.module.css";

export default function Home() {
  const navigate = useNavigate();

  const handleGoToPedir = () => {
    navigate("/pedir");
  };

  return (
    <Layout>
      <main className={styles.home}>
        {/* HERO */}
        <section className={styles.hero}>
          <img
            src="/Banners/hero-image.webp"
            alt="Comida fresca"
            className={styles.heroBg}
          />

          <div className={styles.overlay} />

          <div className={styles.heroContent}>
            <h1 className={styles.title}>
              Tu semana se acaba de volver más práctica y deliciosa.
            </h1>

            <p className={styles.subtitle}>
              Recibí nuestras porciones semanales de comida fresca en tu casa o
              trabajo.
            </p>

            <div className={styles.ctaWrapper}>
              <button className={styles.ctaButton} onClick={handleGoToPedir}>
                HACER PEDIDO
              </button>
            </div>
          </div>

          <div className={styles.banner1Wrapper}>
            <Banner1 />
          </div>
        </section>

        {/* SECCIÓN CARROUSEL */}
        <section className={styles.carrouselSection}>
          <div className={styles.carrouselInner}>
            <div className={styles.carrouselText}>
              <h2 className={styles.carrouselTitle}>
                Más de 200 combinaciones posibles de platos y guarniciones.
              </h2>

              <p className={styles.carrouselSubtitle}>
                No importa si sos vegetariano, tenés dietas restrictivas o un
                deportista de élite: vas a encontrar algo para vos.
              </p>
            </div>

            <div className={styles.carrouselWrapper}>
              <Carrousel />
            </div>
          </div>
        </section>

        <section className={styles.banner2Section}>
          <div className={styles.banner2Wrapper}>
            <Banner2 />
          </div>
        </section>

        <section className={styles.reviewsSection}>
          <div className={styles.reviewsWrapper}>
            <Reviews />
          </div>
        </section>

        <section className={styles.dietSection}>
          <div className={styles.dietHeader}>
            <h2 className={styles.dietTitle}>
              Nutrición para todas las dietas
            </h2>

            <p className={styles.dietSubtitle}>
              No importa si sos vegetariano, tenés dietas restrictivas o un
              deportista de élite: vas a encontrar algo para vos.
            </p>
          </div>

          <div className={styles.dietSelectorWrapper}>
            <DietSelector />
          </div>
        </section>

        <section className={styles.faqSection}>
          <div className={styles.faqWrapper}>
            <FaqAccordion />
          </div>
        </section>

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
