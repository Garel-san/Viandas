// src/api/mock/orderApi.mock.js

let ordersDB = [];

/* ==========================
   Utils
========================== */
function delay() {
  return new Promise((resolve) => {
    setTimeout(resolve, 500 + Math.random() * 500);
  });
}

function uuid() {
  return crypto.randomUUID?.() || Math.random().toString(36).slice(2);
}

/* ==========================
   API MOCK
========================== */
export async function createOrder(payload) {
  await delay();

  if (!payload?.order?.items?.length) {
    throw new Error("Order inválida");
  }

  const order = {
    id: uuid(),
    status: "CONFIRMED",
    createdAt: new Date().toISOString(),
    ...payload,
  };

  ordersDB.push(order);
  return order;
}

export async function getOrderById(id) {
  await delay();

  const order = ordersDB.find((o) => o.id === id);
  if (!order) {
    throw new Error("Order no encontrada");
  }

  return order;
}

export async function listOrders() {
  await delay();
  return [...ordersDB];
}
