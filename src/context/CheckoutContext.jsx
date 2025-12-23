import { createContext, useContext, useState } from "react";
import { orderApi } from "../api";

/* =====================================================
   CONTEXT
===================================================== */
const CheckoutContext = createContext(null);

export function CheckoutProvider({ children }) {
  const [checkoutStarted, setCheckoutStarted] = useState(false);
  const [step, setStep] = useState(1); // 1: guest | 2: delivery | 3: payment

  const [guest, setGuest] = useState(initialState.guest);
  const [delivery, setDelivery] = useState(initialState.delivery);
  const [payment, setPayment] = useState(initialState.payment);

  const [result, setResult] = useState(null);
  const [isConfirming, setIsConfirming] = useState(false);

  /* ======================
     FLUJO
  ====================== */
  function startCheckout() {
    setCheckoutStarted(true);
    setStep(1);
  }

  function nextStep() {
    setStep((s) => Math.min(s + 1, 3));
  }

  function prevStep() {
    setStep((s) => Math.max(s - 1, 1));
  }

  /* ======================
     ACCIONES DE DOMINIO
  ====================== */
  function completeGuest(data) {
    if (!isValidGuest(data)) return false;
    setGuest({ ...data });
    nextStep();
    return true;
  }

  function completeDelivery(data) {
    if (!isValidDelivery(data)) return false;
    setDelivery({ ...data });
    nextStep();
    return true;
  }

  function selectPaymentMethod(method) {
    if (!["card", "cash", "pos"].includes(method)) return false;
    setPayment({ method });
    return true;
  }

  /* ======================
     CONFIRMACIÓN FINAL
  ====================== */
  async function confirmOrder(orderSnapshot) {
    if (!guest || !delivery || !payment) return false;
    if (!orderSnapshot || orderSnapshot.items?.length === 0) return false;

    setIsConfirming(true);

    try {
      const payload = {
        guest,
        delivery,
        payment,
        order: orderSnapshot,
      };

      const response = await orderApi.createOrder(payload);

      setResult(response);
      return true;
    } catch (error) {
      console.error("❌ Error al confirmar orden:", error);
      return false;
    } finally {
      setIsConfirming(false);
    }
  }

  function resetCheckout() {
    setCheckoutStarted(false);
    setStep(1);
    setGuest(initialState.guest);
    setDelivery(initialState.delivery);
    setPayment(initialState.payment);
    setResult(null);
    setIsConfirming(false);
  }

  return (
    <CheckoutContext.Provider
      value={{
        checkoutStarted,
        step,

        guest,
        delivery,
        payment,
        result,
        isConfirming,

        startCheckout,
        nextStep,
        prevStep,

        completeGuest,
        completeDelivery,
        selectPaymentMethod,
        confirmOrder,
        resetCheckout,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  const ctx = useContext(CheckoutContext);
  if (!ctx) {
    throw new Error("useCheckout debe usarse dentro de CheckoutProvider");
  }
  return ctx;
}

/* =====================================================
   ESTADO INICIAL
===================================================== */
const initialState = {
  guest: {
    fullName: "",
    email: "",
    phone: "",
  },

  delivery: {
    address: {
      street: "",
      number: "",
    },
    date: null,
    notes: "",
    mode: "range",
    timeRange: {
      from: "08:30",
      to: "16:00",
    },
    specificTime: null,
  },

  payment: {
    method: null,
  },
};

/* =====================================================
   VALIDACIONES
===================================================== */
const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);
const isValidPhone = (phone) => phone.trim().length >= 6;

const isValidGuest = (guest) =>
  guest.fullName.trim() !== "" &&
  isValidEmail(guest.email) &&
  isValidPhone(guest.phone);

const isValidDelivery = (delivery) => {
  if (!delivery.date) return false;

  const today = new Date();
  const minDate = new Date();
  minDate.setDate(today.getDate() + 2);

  const day = delivery.date.getDay();
  if (delivery.date < minDate || day === 0) return false;

  if (delivery.mode !== "pickup") {
    if (!delivery.address.street || !delivery.address.number) return false;
  }

  if (delivery.mode === "specific" && !delivery.specificTime) return false;

  return true;
};
