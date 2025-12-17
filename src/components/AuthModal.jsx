import { useState } from "react";
import styles from "./AuthModal.module.css";
import { FiEye, FiEyeOff, FiX } from "react-icons/fi";

export default function AuthModal({ onClose }) {
  const [mode, setMode] = useState("login");
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
  });

  const isLoginValid = form.email && form.password;
  const isRegisterValid =
    form.name && form.phone && form.email && form.password;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.close} onClick={onClose}>
          <FiX />
        </button>

        <h2 className={styles.title}>
          {mode === "login" ? "Iniciar sesión" : "Registrarse"}
        </h2>

        {mode === "register" && (
          <>
            <FloatingInput
              label="Nombre completo *"
              name="name"
              value={form.name}
              onChange={handleChange}
            />
            <FloatingInput
              label="Teléfono *"
              name="phone"
              value={form.phone}
              onChange={handleChange}
            />
          </>
        )}

        <FloatingInput
          label="Correo electrónico *"
          name="email"
          value={form.email}
          onChange={handleChange}
        />

        <FloatingInput
          label="Contraseña *"
          name="password"
          type={showPassword ? "text" : "password"}
          value={form.password}
          onChange={handleChange}
          icon={
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          }
        />

        <button
          className={`${styles.submit} ${
            (mode === "login" ? isLoginValid : isRegisterValid)
              ? styles.active
              : ""
          }`}
          disabled={mode === "login" ? !isLoginValid : !isRegisterValid}
        >
          {mode === "login" ? "INICIAR SESIÓN" : "REGISTRARSE"}
        </button>

        <p className={styles.switch}>
          {mode === "login" ? (
            <>
              ¿No tienes una cuenta?{" "}
              <span onClick={() => setMode("register")}>Registrate</span>
            </>
          ) : (
            <>
              ¿Ya tienes una cuenta?{" "}
              <span onClick={() => setMode("login")}>Inicia sesión</span>
            </>
          )}
        </p>
      </div>
    </div>
  );
}

/* =======================
   Input flotante
   ======================= */

function FloatingInput({ label, name, value, onChange, type = "text", icon }) {
  const [focused, setFocused] = useState(false);

  return (
    <div
      className={`${styles.field} ${
        focused || value ? styles.activeField : ""
      }`}
    >
      <label>{label}</label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />

      {icon && <div className={styles.icon}>{icon}</div>}
    </div>
  );
}
