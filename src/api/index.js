// src/api/index.js

import * as mockOrderApi from "./mock/orderApi.mock";

// En el futuro:
// import * as realOrderApi from "./real/orderApi.real";

const mode = import.meta.env.VITE_API_MODE;

export const orderApi =
  mode === "real" ? null /* realOrderApi */ : mockOrderApi;
