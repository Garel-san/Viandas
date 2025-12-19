import { createContext, useContext, useMemo, useState } from "react";

/* ======================
   CONTEXT
   ====================== */
const OrderContext = createContext(null);

/* ======================
   CONSTANTES DE NEGOCIO
   ====================== */
const MIN_ITEMS_REQUIRED = 5;
const SHIPPING_COST = 0;

/* ======================
   PROVIDER
   ====================== */
export function OrderProvider({ children }) {
  /* ======================
     ESTADO BASE
     ====================== */
  const [orderItems, setOrderItems] = useState([]);
  /*
    orderItems: [
      {
        productId,
        title,
        image,
        size,          // "M" | "XL"
        garnishId,     // string | null
        garnishLabel,  // opcional (para UI)
        unitPrice,
        garnishExtra,  // number
        quantity
      }
    ]
  */

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

  // ➕ Agregar item (o sumar cantidad si existe)
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

  // ➕➖ Incrementar cantidad
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

  // ➖ Decrementar cantidad (si llega a 0, elimina)
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

  // 🗑️ Eliminar todas las cantidades de un item
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

  // 🧹 Vaciar pedido (futuro)
  const clearOrder = () => {
    setOrderItems([]);
  };

  /* ======================
     DERIVADOS (NO ESTADO)
     ====================== */

  // Cantidad total de viandas
  const totalItems = useMemo(
    () => orderItems.reduce((sum, item) => sum + item.quantity, 0),
    [orderItems]
  );

  // Subtotal del pedido
  const subtotal = useMemo(
    () =>
      orderItems.reduce(
        (sum, item) =>
          sum + (item.unitPrice + (item.garnishExtra || 0)) * item.quantity,
        0
      ),
    [orderItems]
  );

  // Envío (por ahora fijo)
  const shipping = SHIPPING_COST;

  // Total final
  const total = subtotal + shipping;

  // Regla mínimo de viandas
  const missingItems = Math.max(0, MIN_ITEMS_REQUIRED - totalItems);
  const canProceed = totalItems >= MIN_ITEMS_REQUIRED;

  /* ======================
     CONTEXT VALUE
     ====================== */
  const value = {
    /* estado */
    orderItems,

    /* acciones */
    addItem,
    incrementItem,
    decrementItem,
    removeItem,
    clearOrder,

    /* derivados */
    totalItems,
    subtotal,
    shipping,
    total,
    missingItems,
    canProceed,

    /* constantes (útil para UI) */
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
