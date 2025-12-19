import { useState, useMemo } from "react";
import { useCheckout } from "../../context/CheckoutContext";
import styles from "./GuestSection.module.css";

export default function GuestSection() {
  const { guest, actions } = useCheckout();

  const [form, setForm] = useState({
    fullName: guest.fullName,
    email: guest.email,
    phone: guest.phone,
    remember: guest.remember,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
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
    actions.completeGuest(form);
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

      {/* Checkbox */}
      <label className={styles.checkbox}>
        <input
          type="checkbox"
          name="remember"
          checked={form.remember}
          onChange={handleChange}
        />
        Autocompletar el próximo pedido
      </label>

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

        <button type="button" className={styles.linkBtn}>
          VOLVER
        </button>
      </div>

      <button className={styles.loginLink}>YA TENGO UNA CUENTA</button>
    </section>
  );
}
