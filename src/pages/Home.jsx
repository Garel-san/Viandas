import Layout from "../components/Layout";

import Banner1 from "../components/Banner1";
import Carrousel from "../components/Carrousel";
import Banner2 from "../components/Banner2";
import Reviews from "../components/Reviews";
import DietSelector from "../components/DietSelector";
import FaqAccordion from "../components/FaqAccordion";
import Banner3 from "../components/Banner3";
import Footer from "../components/Footer";

import styles from "./Home.module.css";

export default function Home() {
  return (
    <Layout>
      <main className={styles.home}>
        {/* HERO */}
        <section className={styles.hero}>
          {/* Background */}
          <img
            src="/hero-image.webp"
            alt="Comida fresca"
            className={styles.heroBg}
          />

          {/* Overlay */}
          <div className={styles.overlay} />

          {/* Contenido central */}
          <div className={styles.heroContent}>
            <h1 className={styles.title}>
              Tu semana se acaba de volver más práctica y deliciosa.
            </h1>

            <p className={styles.subtitle}>
              Recibí nuestras porciones semanales de comida fresca en tu casa o
              trabajo.
            </p>

            <button className={styles.ctaButton}>HACER PEDIDO</button>
          </div>

          {/* Banner 1 flotando sobre el hero */}
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

        {/* SECCIÓN BANNER 2 */}
        <section className={styles.banner2Section}>
          <div className={styles.banner2Wrapper}>
            <Banner2 />
          </div>
        </section>

        {/* SECCIÓN REVIEWS */}
        <section className={styles.reviewsSection}>
          <div className={styles.reviewsWrapper}>
            <Reviews />
          </div>
        </section>

        {/* SECCIÓN DIET SELECTOR */}
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

        {/* SECCIÓN FAQ */}
        <section className={styles.faqSection}>
          <div className={styles.faqWrapper}>
            <FaqAccordion />
          </div>
        </section>

        {/* SECCIÓN BANNER 3 */}
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
