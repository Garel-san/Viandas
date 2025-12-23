import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import "./styles/global.css";

import { ProductsDataProvider } from "./context/ProductsDataContext";
import { OrderProvider } from "./context/OrderDataContext";
import { CheckoutProvider } from "./context/CheckoutContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ProductsDataProvider>
        <OrderProvider>
          <CheckoutProvider>
            <App />
          </CheckoutProvider>
        </OrderProvider>
      </ProductsDataProvider>
    </BrowserRouter>
  </React.StrictMode>
);
