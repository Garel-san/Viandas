import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import CheckoutLayout from "../pages/CheckoutLayout";
import Success from "../pages/Success";
import Suscribirse from "../pages/Suscribirse";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pedir" element={<CheckoutLayout />} />
      <Route path="/success" element={<Success />} />
      <Route path="/suscribirse" element={<Suscribirse />}></Route>
    </Routes>
  );
}
