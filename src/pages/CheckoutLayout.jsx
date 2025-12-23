import { useEffect, useState } from "react";

import PedirBreadcrumb from "../components/Pedir/PedirBreadcrumb";
import FiltersBar from "../components/Pedir/FiltersBar";
import ProductsGrid from "../components/Product/ProductsGrid";
import OrderSummary from "../components/Order/OrderSummary";
import OrderHeader from "../components/Order/OrderHeader";
import OrderOverlay from "../components/Order/OrderOverlay";
import CheckoutFlow from "../components/Steps/CheckoutFlow";

import { useCheckout } from "../context/CheckoutContext";
import { useOrder } from "../context/OrderDataContext";
import styles from "./CheckoutLayout.module.css";

/* ==========================
   CONTENIDO IZQUIERDO
========================== */
function LeftContent() {
  const { checkoutStarted } = useCheckout();

  if (!checkoutStarted) {
    return (
      <div className={styles.products}>
        <ProductsGrid />
      </div>
    );
  }

  return <CheckoutFlow />;
}

/* ==========================
   PAGE
========================== */
export default function CheckoutLayout() {
  const [isMobile, setIsMobile] = useState(false);
  const { totalItems, isOrderOpen } = useOrder();
  const { checkoutStarted } = useCheckout();

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <main className={styles.page}>
      {/* ================= HEADER ================= */}
      <PedirBreadcrumb />

      {/* ================= CONTENIDO ================= */}
      <div className={styles.content}>
        {/* ===== COLUMNA IZQUIERDA ===== */}
        <section className={styles.left}>
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

      {isMobile && totalItems > 0 && !isOrderOpen && (
        <OrderHeader variant="bar" totalViandas={totalItems} />
      )}

      {isMobile && isOrderOpen && <OrderOverlay />}
    </main>
  );
}
