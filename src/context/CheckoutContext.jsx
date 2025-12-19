import { createContext, useContext, useState, useMemo, useEffect } from "react";

/* =====================================================
   CONTEXT
===================================================== */
const CheckoutContext = createContext(null);

const STORAGE_KEY = "viandas_checkout_progress";

export const CheckoutProvider = ({ children }) => {
  const [state, setState] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return initialState;

    try {
      const parsed = JSON.parse(stored);

      return {
        ...initialState,
        step: parsed.step ?? "guest",
        guest: {
          ...initialState.guest,
          completed: parsed.guest?.completed ?? false,
        },
        delivery: {
          ...initialState.delivery,
          completed: parsed.delivery?.completed ?? false,
          mode: parsed.delivery?.mode ?? initialState.delivery.mode,
          date: parsed.delivery?.date ? new Date(parsed.delivery.date) : null,
        },
        payment: {
          ...initialState.payment,
          completed: parsed.payment?.completed ?? false,
        },
      };
    } catch {
      return initialState;
    }
  });

  /* ======================
     PERSISTENCIA
  ====================== */
  useEffect(() => {
    const progressToStore = {
      step: state.step,
      guest: { completed: state.guest.completed },
      delivery: {
        completed: state.delivery.completed,
        mode: state.delivery.mode,
        date: state.delivery.date,
      },
      payment: { completed: state.payment.completed },
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(progressToStore));
  }, [
    state.step,
    state.guest.completed,
    state.delivery.completed,
    state.delivery.mode,
    state.delivery.date,
    state.payment.completed,
  ]);

  /* ======================
     ACCIONES
  ====================== */
  const completeGuest = (guestData) => {
    if (!isValidGuest(guestData)) return false;

    setState((prev) => ({
      ...prev,
      guest: { ...guestData, completed: true },
      step: "delivery",
    }));

    return true;
  };

  const setDeliveryMode = (mode) => {
    setState((prev) => ({
      ...prev,
      delivery: {
        ...prev.delivery,
        mode,
        specificTime: mode === "specific" ? prev.delivery.specificTime : null,
      },
    }));
  };

  const setDeliveryDate = (date) => {
    if (!isValidDeliveryDate(date)) return false;

    setState((prev) => ({
      ...prev,
      delivery: { ...prev.delivery, date },
    }));

    return true;
  };

  const completeDelivery = (deliveryData) => {
    const { mode, address, date, specificTime } = deliveryData;

    if (!isValidDeliveryDate(date)) return false;

    if (mode !== "pickup") {
      if (!address.street || !address.number) return false;
    }

    if (mode === "specific" && !specificTime) return false;

    setState((prev) => ({
      ...prev,
      delivery: {
        ...deliveryData,
        completed: true,
      },
      step: "payment",
    }));

    return true;
  };

  const selectPaymentMethod = (method) => {
    if (!["card", "cash", "pos"].includes(method)) return false;

    setState((prev) => ({
      ...prev,
      payment: {
        ...prev.payment,
        method,
        completed: true,
      },
    }));

    return true;
  };

  const confirmOrder = () => {
    localStorage.removeItem(STORAGE_KEY);

    setState((prev) => ({
      ...prev,
      step: "success",
      result: {
        orderId: Math.floor(Math.random() * 100000).toString(),
        createdAt: new Date(),
      },
    }));
  };

  const actions = {
    completeGuest,
    setDeliveryMode,
    setDeliveryDate,
    completeDelivery,
    selectPaymentMethod,
    confirmOrder,
  };

  /* ======================
     DERIVED STATE
  ====================== */
  const derived = useMemo(
    () => ({
      canProceedGuest: isValidGuest(state.guest),
      canProceedDelivery: state.delivery.completed,
      canProceedPayment: state.payment.completed,
      isCompleted: state.step === "success",
    }),
    [state]
  );

  return (
    <CheckoutContext.Provider
      value={{
        ...state,
        ...derived,
        actions,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = () => {
  const ctx = useContext(CheckoutContext);
  if (!ctx) {
    throw new Error("useCheckout debe usarse dentro de CheckoutProvider");
  }
  return ctx;
};

/* =====================================================
   ESTADO INICIAL
===================================================== */
const initialState = {
  step: "guest",

  guest: {
    fullName: "",
    email: "",
    phone: "",
    remember: false,
    completed: false,
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
    completed: false,
  },

  payment: {
    method: null,
    cardReady: false,
    completed: false,
  },

  result: {
    orderId: null,
    createdAt: null,
  },
};

/* =====================================================
   VALIDACIONES DE DOMINIO
===================================================== */
const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);
const isValidPhone = (phone) => phone.trim().length >= 6;

const isValidGuest = (guest) =>
  guest.fullName.trim() !== "" &&
  isValidEmail(guest.email) &&
  isValidPhone(guest.phone);

const isValidDeliveryDate = (date) => {
  if (!date) return false;

  const today = new Date();
  const minDate = new Date();
  minDate.setDate(today.getDate() + 2);

  const day = date.getDay(); // 0 = domingo

  return date >= minDate && day !== 0;
};
