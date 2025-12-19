import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Pedir from "./pages/Pedir";
import Success from "./pages/Success";

import { ProductsDataProvider } from "./context/ProductsDataContext";
import { OrderProvider } from "./context/OrderDataContext";
import { CheckoutProvider } from "./context/CheckoutContext";

function App() {
  return (
    <BrowserRouter>
      <ProductsDataProvider>
        <OrderProvider>
          <CheckoutProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/pedir" element={<Pedir />} />
              <Route path="/success" element={<Success />} />
            </Routes>
          </CheckoutProvider>
        </OrderProvider>
      </ProductsDataProvider>
    </BrowserRouter>
  );
}

export default App;
