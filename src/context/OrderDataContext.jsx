import { createContext, useContext, useMemo, useState } from "react";

/* ======================
   CONTEXT
====================== */
const OrderContext = createContext(null);

/* ======================
   CONSTANTES
====================== */
const MIN_ITEMS_REQUIRED = 5;
const SHIPPING_COST = 0;

/* ======================
   PROVIDER
====================== */
export function OrderProvider({ children }) {
  const [orderItems, setOrderItems] = useState([]);

  /* 🔹 NUEVO: overlay mobile */
  const [isOrderOpen, setIsOrderOpen] = useState(false);

  /* ======================
     HELPERS
  ====================== */
  const findItemIndex = (identity) =>
    orderItems.findIndex(
      (item) =>
        item.productId === identity.productId &&
        item.size === identity.size &&
        item.garnishId === identity.garnishId
    );

  /* ======================
     ACTIONS
  ====================== */
  const addItem = (newItem) => {
    setOrderItems((prev) => {
      const index = findItemIndex(newItem);

      if (index !== -1) {
        const updated = [...prev];
        updated[index] = {
          ...updated[index],
          quantity: updated[index].quantity + newItem.quantity,
        };
        return updated;
      }

      return [...prev, newItem];
    });
  };

  const incrementItem = (identity) => {
    setOrderItems((prev) =>
      prev.map((item) =>
        item.productId === identity.productId &&
        item.size === identity.size &&
        item.garnishId === identity.garnishId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decrementItem = (identity) => {
    setOrderItems((prev) =>
      prev
        .map((item) =>
          item.productId === identity.productId &&
          item.size === identity.size &&
          item.garnishId === identity.garnishId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (identity) => {
    setOrderItems((prev) =>
      prev.filter(
        (item) =>
          !(
            item.productId === identity.productId &&
            item.size === identity.size &&
            item.garnishId === identity.garnishId
          )
      )
    );
  };

  const clearOrder = () => {
    setOrderItems([]);
    setIsOrderOpen(false);
  };

  /* ======================
     DERIVADOS
  ====================== */
  const totalItems = useMemo(
    () => orderItems.reduce((sum, item) => sum + item.quantity, 0),
    [orderItems]
  );

  const subtotal = useMemo(
    () =>
      orderItems.reduce(
        (sum, item) =>
          sum + (item.unitPrice + (item.garnishExtra || 0)) * item.quantity,
        0
      ),
    [orderItems]
  );

  const shipping = SHIPPING_COST;
  const total = subtotal + shipping;

  const missingItems = Math.max(0, MIN_ITEMS_REQUIRED - totalItems);
  const canProceed = totalItems >= MIN_ITEMS_REQUIRED;

  /* ======================
     SNAPSHOT
  ====================== */
  const getOrderSnapshot = () => ({
    items: orderItems.map((item) => ({ ...item })),
    totalItems,
    subtotal,
    shipping,
    total,
  });

  /* ======================
     OVERLAY ACTIONS
  ====================== */
  const openOrder = () => setIsOrderOpen(true);
  const closeOrder = () => setIsOrderOpen(false);

  /* ======================
     CONTEXT VALUE
  ====================== */
  const value = {
    orderItems,

    addItem,
    incrementItem,
    decrementItem,
    removeItem,
    clearOrder,

    totalItems,
    subtotal,
    shipping,
    total,
    missingItems,
    canProceed,

    getOrderSnapshot,

    /* 🔹 overlay */
    isOrderOpen,
    openOrder,
    closeOrder,

    MIN_ITEMS_REQUIRED,
  };

  return (
    <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
  );
}

/* ======================
   HOOK
====================== */
export function useOrder() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrder debe usarse dentro de OrderProvider");
  }
  return context;
}
