import { useState } from "react";
import Navbar from "./Navbar";
import AuthModal from "./AuthModal";

export default function Layout({ children }) {
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <>
      <Navbar onLoginClick={() => setAuthOpen(true)} />

      {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}

      {children}
    </>
  );
}
