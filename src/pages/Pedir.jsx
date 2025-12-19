import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import PedirBreadcrumb from "../components/Pedir/PedirBreadcrumb";
import FiltersBar from "../components/Pedir/FiltersBar";
import ProductsGrid from "../components/Product/ProductsGrid";
import OrderSummary from "../components/Order/OrderSummary";
import CheckoutFlow from "../components/Steps/CheckoutFlow";

import { useCheckout } from "../context/CheckoutContext";

import styles from "./Pedir.module.css";

/* ==========================
   CONTENIDO IZQUIERDO
========================== */
const LeftContent = ({ checkoutStarted }) => {
  // El step solo se usa cuando checkout está iniciado
  if (!checkoutStarted) {
    return (
      <>
        <div className={styles.filters}>
          <FiltersBar />
        </div>

        <div className={styles.products}>
          <ProductsGrid />
        </div>
      </>
    );
  }

  return <CheckoutFlow />;
};

/* ==========================
   PAGE CONTENT
========================== */
const PedirContent = () => {
  const { step } = useCheckout();
  const [checkoutStarted, setCheckoutStarted] = useState(false);
  const navigate = useNavigate();

  const stepMap = {
    guest: 2,
    delivery: 2,
    payment: 3,
  };

  /* ==========================
     BREADCRUMB STATE
  ========================== */
  let currentStep = 1;
  let completedSteps = [];

  if (checkoutStarted) {
    currentStep = stepMap[step] ?? 2;
    completedSteps = [1].filter((s) => s < currentStep);
  }

  /* ==========================
     NAVEGACIÓN FINAL
  ========================== */
  useEffect(() => {
    if (step === "success") {
      navigate("/success");
    }
  }, [step, navigate]);

  return (
    <main className={styles.page}>
      <PedirBreadcrumb
        currentStep={currentStep}
        completedSteps={completedSteps}
      />

      <div className={styles.content}>
        {/* IZQUIERDA */}
        <section className={styles.left}>
          <LeftContent checkoutStarted={checkoutStarted} />
        </section>

        {/* DERECHA */}
        <aside className={styles.right}>
          <OrderSummary onStartCheckout={() => setCheckoutStarted(true)} />
        </aside>
      </div>
    </main>
  );
};

/* ==========================
   EXPORT
========================== */
export default function Pedir() {
  return <PedirContent />;
}
