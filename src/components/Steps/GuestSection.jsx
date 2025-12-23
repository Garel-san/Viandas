import { useState, useMemo } from "react";
import { useCheckout } from "../../context/CheckoutContext";

import styles from "./GuestSection.module.css";

export default function GuestSection() {
  const { guest, completeGuest } = useCheckout();

  const [form, setForm] = useState({
    fullName: guest.fullName,
    email: guest.email,
    phone: guest.phone,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const isFormValid = useMemo(() => {
    return (
      form.fullName.trim() !== "" &&
      /\S+@\S+\.\S+/.test(form.email) &&
      form.phone.trim().length >= 6
    );
  }, [form]);

  const handleSubmit = () => {
    const ok = completeGuest(form);
    if (!ok) {
      alert("Datos inválidos. Verificá la información.");
    }
  };

  return (
    <section className={styles.section}>
      {/* Título */}
      <h2 className={styles.title}>
        <span className={styles.step}>1</span>
        Continuar el pedido como invitado
      </h2>

      <p className={styles.subtitle}>Completá los datos para continuar</p>

      {/* Grid de inputs */}
      <div className={styles.formGrid}>
        <div className={styles.field}>
          <label>Nombre y apellido</label>
          <input
            type="text"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
          />
        </div>

        <div className={styles.field}>
          <label>Correo electrónico</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div className={styles.field}>
          <label>Teléfono</label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Acciones */}
      <div className={styles.actions}>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!isFormValid}
          className={styles.primaryBtn}
        >
          CONTINUAR &gt;
        </button>
      </div>

      {/* Placeholder futuro */}
      <button className={styles.loginLink} disabled>
        YA TENGO UNA CUENTA
      </button>
    </section>
  );
}
