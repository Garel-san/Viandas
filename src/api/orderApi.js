// src/api/orderApi.js

/**
 * Simula latencia real de red (500–1000ms)
 */
function simulateDelay() {
  const delay = 500 + Math.random() * 500;
  return new Promise((resolve) => setTimeout(resolve, delay));
}

/**
 * Genera un UUID simple (mock)
 */
function generateUUID() {
  return crypto.randomUUID?.() || Math.random().toString(36).slice(2);
}

/**
 * API MOCK — crear orden
 * @param {Object} orderPayload
 * @returns {Promise<Object>}
 */
export async function createOrder(orderPayload) {
  await simulateDelay();

  // 🔒 Validación mínima defensiva
  if (!orderPayload?.order?.items?.length) {
    return Promise.reject({
      status: "ERROR",
      message: "Order inválida: sin items",
    });
  }

  return {
    id: generateUUID(),
    status: "CONFIRMED",
    createdAt: new Date().toISOString(),
    ...orderPayload,
  };
}
