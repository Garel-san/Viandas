import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import CheckoutLayout from "../pages/CheckoutLayout";
import Success from "../pages/Success";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pedir" element={<CheckoutLayout />} />
      <Route path="/success" element={<Success />} />
    </Routes>
  );
}
