import { useState, useMemo, useRef, useEffect } from "react";
import { useCheckout } from "../../context/CheckoutContext";
import styles from "./DeliverySection.module.css";

const WEEK_DAYS = ["lu", "ma", "mi", "ju", "vi", "sá", "do"];

export default function DeliverySection() {
  const { delivery, actions } = useCheckout();

  const [form, setForm] = useState({
    address: {
      street: delivery.address.street || "",
      number: delivery.address.number || "",
    },
    date: delivery.date || null,
    notes: delivery.notes || "",
    mode: delivery.mode,
    specificTime: delivery.specificTime,
  });

  const [open, setOpen] = useState(false);
  const fieldRef = useRef(null);

  /* ======================
     FECHAS
  ====================== */
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const minDate = useMemo(() => {
    const d = new Date(today);
    d.setDate(d.getDate() + 1); // +24hs
    return d;
  }, [today]);

  const [currentMonth, setCurrentMonth] = useState(
    new Date(minDate.getFullYear(), minDate.getMonth(), 1)
  );

  /* ======================
     CERRAR CLICK FUERA
  ====================== */
  useEffect(() => {
    const handler = (e) => {
      if (fieldRef.current && !fieldRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* ======================
     HELPERS CALENDARIO
  ====================== */
  const daysInMonth = (y, m) => new Date(y, m + 1, 0).getDate();

  const firstWeekday = (y, m) => {
    const d = new Date(y, m, 1).getDay(); // 0 domingo
    return d === 0 ? 6 : d - 1; // lunes = 0
  };

  const buildCalendar = () => {
    const y = currentMonth.getFullYear();
    const m = currentMonth.getMonth();
    const days = [];
    for (let i = 0; i < firstWeekday(y, m); i++) days.push(null);
    for (let d = 1; d <= daysInMonth(y, m); d++) {
      days.push(new Date(y, m, d));
    }
    return days;
  };

  const isDisabled = (date) => {
    if (!date) return true;
    if (date < minDate) return true;
    if (date.getDay() === 0) return true; // domingo
    return false;
  };

  const isSelected = (date) =>
    form.date && date && date.toDateString() === form.date.toDateString();

  /* ======================
     HANDLERS EXISTENTES
  ====================== */
  const handleDateSelect = (date) => {
    if (isDisabled(date)) return;

    const ok = actions.setDeliveryDate(date);
    if (!ok) return;

    setForm((prev) => ({ ...prev, date }));
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("address.")) {
      const key = name.split(".")[1];
      setForm((prev) => ({
        ...prev,
        address: { ...prev.address, [key]: value },
      }));
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleModeChange = (mode) => {
    actions.setDeliveryMode(mode);
    setForm((prev) => ({
      ...prev,
      mode,
      specificTime: mode === "specific" ? prev.specificTime : null,
    }));
  };

  const handleSubmit = () => {
    actions.completeDelivery({ ...delivery, ...form });
  };

  /* ======================
     VALIDACIÓN
  ====================== */
  const isFormValid = useMemo(() => {
    if (!form.date) return false;

    if (form.mode !== "pickup") {
      if (!form.address.street.trim()) return false;
      if (!form.address.number.trim()) return false;
    }

    if (form.mode === "specific" && !form.specificTime) return false;

    return true;
  }, [form]);

  /* ======================
     RENDER
  ====================== */
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>
        <span className={styles.step}>2</span>
        Información de entrega
      </h2>

      <p className={styles.subtitle}>
        ¿Cuándo y dónde vas a recibir tu pedido?
      </p>

      <div className={styles.formGrid}>
        {form.mode !== "pickup" && (
          <>
            <div className={styles.field}>
              <label>Calle</label>
              <input
                type="text"
                name="address.street"
                value={form.address.street}
                onChange={handleChange}
              />
            </div>

            <div className={styles.field}>
              <label>Nro de puerta</label>
              <input
                type="text"
                name="address.number"
                value={form.address.number}
                onChange={handleChange}
              />
            </div>
          </>
        )}

        {/* ======================
            FECHA (CUSTOM)
        ====================== */}
        <div className={`${styles.field} ${styles.dateField}`} ref={fieldRef}>
          <label>Fecha de entrega</label>
          <input
            type="text"
            readOnly
            value={
              form.date ? form.date.toLocaleDateString("es-AR") : "Seleccione"
            }
            onClick={() => setOpen((v) => !v)}
          />

          {open && (
            <div className={styles.calendarPopover}>
              <div className={styles.calendarHeader}>
                <button
                  onClick={() =>
                    setCurrentMonth(
                      new Date(
                        currentMonth.getFullYear(),
                        currentMonth.getMonth() - 1,
                        1
                      )
                    )
                  }
                >
                  ‹
                </button>

                <span>
                  {currentMonth.toLocaleDateString("es-AR", {
                    month: "long",
                    year: "numeric",
                  })}
                </span>

                <button
                  onClick={() =>
                    setCurrentMonth(
                      new Date(
                        currentMonth.getFullYear(),
                        currentMonth.getMonth() + 1,
                        1
                      )
                    )
                  }
                >
                  ›
                </button>
              </div>

              <div className={styles.weekdays}>
                {WEEK_DAYS.map((d) => (
                  <span key={d}>{d}</span>
                ))}
              </div>

              <div className={styles.daysGrid}>
                {buildCalendar().map((date, i) => (
                  <button
                    key={i}
                    className={`${styles.day} ${
                      isSelected(date) ? styles.selected : ""
                    } ${isDisabled(date) ? styles.disabled : ""}`}
                    onClick={() => handleDateSelect(date)}
                  >
                    {date ? date.getDate() : ""}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className={styles.field}>
          <label>Notas adicionales</label>
          <input
            type="text"
            name="notes"
            placeholder="ej. Postres sin azúcar o Apto. 11B"
            value={form.notes}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* MODOS */}
      <div className={styles.modes}>
        <label className={styles.mode}>
          <input
            type="checkbox"
            checked={form.mode === "range"}
            onChange={() => handleModeChange("range")}
          />
          Recibir entre 8:30 a.m y 16:00 p.m
        </label>

        <label className={styles.mode}>
          <input
            type="checkbox"
            checked={form.mode === "specific"}
            onChange={() => handleModeChange("specific")}
          />
          Recibir en horario específico (+$350)
        </label>

        <label className={styles.mode}>
          <input
            type="checkbox"
            checked={form.mode === "pickup"}
            onChange={() => handleModeChange("pickup")}
          />
          Retirar en local (Av. Gabriela Mistral 4223, Montevideo)
        </label>
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.primaryBtn}
          onClick={handleSubmit}
          disabled={!isFormValid}
        >
          CONTINUAR &gt;
        </button>

        <button type="button" className={styles.linkBtn}>
          Volver
        </button>
      </div>
    </section>
  );
}
