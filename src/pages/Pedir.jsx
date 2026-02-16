import { useEffect, useState } from "react";

import PedirBreadcrumb from "../components/-Pedir/PedirStepper";
import FiltersBar from "../components/-Pedir/BarraFiltros";
import ProductsGrid from "../components/-Pedir/Product/ProductsContainer";
import OrderSummary from "../components/-Pedir/Carrito/OrderSummary";
import OrderHeader from "../components/-Pedir/Carrito/OrderHeader";
import OrderOverlay from "../components/-Pedir/Carrito/OrderMovil";
import CheckoutFlow from "../components/-Pedir/Pasos/PanelPasos";

import { useCheckout } from "../context/CheckoutContext";
import { useOrder } from "../context/OrderDataContext";
import styles from "./Pedir.module.css";

/* ==========================
   TEXTOS LOADER
========================== */
const LOADER_TEXTS = [
  "Ajustando los condimentos...",
  "Preparando ingredientes...",
  "Sacando del horno...",
  "Cortando las frutas...",
];

/* ==========================
   LOADER OVERLAY
========================== */
function ProductsLoader() {
  const [text] = useState(() => {
    const i = Math.floor(Math.random() * LOADER_TEXTS.length);
    return LOADER_TEXTS[i];
  });

  return (
    <div className={styles.loaderOverlay}>
      <div className={styles.loader}>
        <img
          src="/Loaders/loader1.gif"
          alt="Cargando productos"
          className={styles.loaderImage}
        />
        <p className={styles.loaderText}>{text}</p>
      </div>
    </div>
  );
}

/* ==========================
   CONTENIDO IZQUIERDO
========================== */
function LeftContent() {
  const { checkoutStarted } = useCheckout();
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    if (!checkoutStarted) {
      setShowLoader(true);

      const timer = setTimeout(() => {
        setShowLoader(false);
      }, 1400);

      return () => clearTimeout(timer);
    }
  }, [checkoutStarted]);

  if (checkoutStarted) {
    return (
      <div className={styles.checkoutFlow}>
        <div className={styles.stepsWrapper}>
          <CheckoutFlow />
        </div>
      </div>
    );
  }

  return (
    <>
      {showLoader && <ProductsLoader />}

      <div className={styles.products}>
        <ProductsGrid />
      </div>
    </>
  );
}

/* ==========================
   PAGE
========================== */
export default function CheckoutLayout() {
  const [isMobile, setIsMobile] = useState(false);
  const { totalItems, isOrderOpen } = useOrder();
  const { checkoutStarted } = useCheckout();

  /* ==========================
     SCROLL TO TOP AL ENTRAR
  ========================== */
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  /* ==========================
     RESPONSIVE
  ========================== */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <main
      className={`${styles.page} ${
        isMobile && !checkoutStarted ? styles.withOrderBar : ""
      }`}
    >
      {/* ================= HEADER ================= */}
      <PedirBreadcrumb />

      {/* ================= CONTENIDO ================= */}
      <div
        className={`${styles.content} ${
          checkoutStarted ? styles.contentSteps : ""
        }`}
      >
        {/* ===== COLUMNA IZQUIERDA ===== */}
        <section className={styles.left}>
          {!checkoutStarted && (
            <div className={styles.intro}>
              <h1 className={styles.introTitle}>
                Elegí los platos que quieras recibir
              </h1>

              <p className={styles.introSubtitle}>
                Encontrá el plato ideal para vos utilizando nuestros filtros o
                el buscador.
              </p>
            </div>
          )}

          {!checkoutStarted && <FiltersBar />}

          <LeftContent />
        </section>

        {/* ===== DESKTOP: SIDEBAR PEDIDO ===== */}
        {!isMobile && (
          <aside className={styles.right}>
            <OrderSummary />
          </aside>
        )}
      </div>

      {/* ================= MOBILE ================= */}
      {isMobile && !checkoutStarted && (
        <>
          {!isOrderOpen && (
            <OrderHeader variant="bar" totalViandas={totalItems} />
          )}

          {/* ✅ Siempre montado para poder animar open/close */}
          <OrderOverlay isOpen={isOrderOpen} />
        </>
      )}
    </main>
  );
}
