import { useState, useMemo } from "react";
import { useCheckout } from "../../../context/CheckoutContext";
import styles from "./PrimerPaso.module.css";

export default function GuestSection() {
  const { guest, completeGuest, resetCheckout } = useCheckout();

  const [mode, setMode] = useState("guest"); // guest | login

  /* ======================
     INVITADO
  ====================== */
  const [form, setForm] = useState({
    fullName: guest.fullName,
    email: guest.email,
    phone: guest.phone,
  });

  const handleGuestChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const isGuestFormValid = useMemo(() => {
    return (
      form.fullName.trim() !== "" &&
      /\S+@\S+\.\S+/.test(form.email) &&
      form.phone.trim().length >= 6
    );
  }, [form]);

  const handleGuestSubmit = () => {
    const ok = completeGuest(form);
    if (!ok) {
      alert("Datos inválidos. Verificá la información.");
    }
  };

  /* ======================
     LOGIN (placeholder)
  ====================== */
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [loginError, setLoginError] = useState("");

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = () => {
    setLoginError("Esta funcionalidad aún está en proceso.");
  };

  /* ======================
     RENDER
  ====================== */
  return (
    <section className={styles.section}>
      <p className={styles.subtitle}>
        {mode === "guest"
          ? "Completá los datos para continuar"
          : "Ingresá con tu cuenta"}
      </p>

      {/* ======================
          FORMULARIOS
      ====================== */}
      {mode === "guest" && (
        <div className={styles.formGrid}>
          <div className={styles.field}>
            <label>Nombre y apellido</label>
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleGuestChange}
            />
          </div>

          <div className={styles.field}>
            <label>Correo electrónico</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleGuestChange}
            />
          </div>

          <div className={styles.field}>
            <label>Teléfono</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleGuestChange}
            />
          </div>
        </div>
      )}

      {mode === "login" && (
        <div className={styles.formGrid}>
          <div className={styles.field}>
            <label>Correo electrónico</label>
            <input
              type="email"
              name="email"
              value={loginForm.email}
              onChange={handleLoginChange}
            />
          </div>

          <div className={styles.field}>
            <label>Contraseña</label>
            <input
              type="password"
              name="password"
              value={loginForm.password}
              onChange={handleLoginChange}
            />
          </div>
        </div>
      )}

      {/* ERROR LOGIN */}
      {loginError && <p className={styles.loginError}>{loginError}</p>}

      {/* ======================
          ACTIONS
      ====================== */}
      <div className={styles.actions}>
        <button
          type="button"
          onClick={mode === "guest" ? handleGuestSubmit : handleLoginSubmit}
          disabled={mode === "guest" && !isGuestFormValid}
          className={styles.primaryBtn}
        >
          CONTINUAR &gt;
        </button>

        <button
          type="button"
          onClick={resetCheckout}
          className={styles.secondaryBtn}
        >
          VOLVER
        </button>
      </div>

      {/* ======================
          TOGGLE
      ====================== */}
      <button
        className={styles.loginLink}
        onClick={() => {
          setMode((m) => (m === "guest" ? "login" : "guest"));
          setLoginError("");
          setLoginForm({ email: "", password: "" });
        }}
      >
        {mode === "guest" ? "YA TENGO UNA CUENTA" : "SEGUIR COMO INVITADO"}
      </button>
    </section>
  );
}
