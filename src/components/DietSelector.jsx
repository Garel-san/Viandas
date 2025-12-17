import { useState } from "react";
import styles from "./DietSelector.module.css";

const DIETS = [
  { key: "vegetariano", label: "Vegetariano" },
  { key: "fitness", label: "Fitness" },
  { key: "proteina", label: "Proteína+" },
  { key: "keto", label: "Keto" },
  { key: "gluten", label: "Gluten Free" },
  { key: "baja", label: "Baja caloría" },
];

const DIET_CONTENT = {
  vegetariano: {
    title: "VEGETARIANO",
    desc: "Platos especialmente preparados por nutricionistas para darle a tu cuerpo el combustible que necesita.",
    stats: [
      { value: "45g", label: "Carbos" },
      { value: "16g", label: "Proteínas" },
      { value: "28g", label: "Grasas" },
      { value: "510", label: "Calorías" },
    ],
    fondo: "/vegetariano_fondo.webp",
    vianda: "/vegetariano_vianda.webp",
    theme: "veg",
  },

  fitness: {
    title: "FITNESS",
    desc: "Platos especialmente preparados por nutricionistas para darle a tu cuerpo el combustible que necesita.",
    stats: [
      { value: "38g", label: "Carbos" },
      { value: "34g", label: "Proteínas" },
      { value: "18g", label: "Grasas" },
      { value: "480", label: "Calorías" },
    ],
    fondo: "/fitness_fondo.webp",
    vianda: "/fitness_vianda.webp",
    theme: "fit",
  },

  proteina: {
    title: "PROTEÍNA+",
    desc: "Platos especialmente preparados por nutricionistas para darle a tu cuerpo el combustible que necesita.",
    stats: [
      { value: "25g", label: "Carbos" },
      { value: "40g", label: "Proteínas" },
      { value: "12g", label: "Grasas" },
      { value: "490", label: "Calorías" },
    ],
    fondo: "/proteina_fondo.webp",
    vianda: "/proteina_vianda.webp",
    theme: "pro",
  },

  keto: {
    title: "KETO",
    desc: "Platos especialmente preparados por nutricionistas para darle a tu cuerpo el combustible que necesita.",
    stats: [
      { value: "11g", label: "Carbos" },
      { value: "42g", label: "Proteínas" },
      { value: "24g", label: "Grasas" },
      { value: "460", label: "Calorías" },
    ],
    fondo: "/keto_fondo.webp",
    vianda: "/keto_vianda.webp",
    theme: "keto",
  },

  gluten: {
    title: "SIN GLUTEN",
    desc: "Platos especialmente preparados por nutricionistas para darle a tu cuerpo el combustible que necesita.",
    stats: [
      { value: "18g", label: "Carbos" },
      { value: "36g", label: "Proteínas" },
      { value: "14g", label: "Grasas" },
      { value: "390", label: "Calorías" },
    ],
    fondo: "/singluten_fondo.webp",
    vianda: "/singluten_vianda.webp",
    theme: "glu",
  },

  baja: {
    title: "BAJA CALORÍA",
    desc: "Platos especialmente preparados por nutricionistas para darle a tu cuerpo el combustible que necesita.",
    stats: [
      { value: "30g", label: "Carbos" },
      { value: "26g", label: "Proteínas" },
      { value: "9g", label: "Grasas" },
      { value: "350", label: "Calorías" },
    ],
    fondo: "/bajacaloria_fondo.webp",
    vianda: "/bajacaloria_vianda.webp",
    theme: "low",
  },
};

export default function DietSelector() {
  const [active, setActive] = useState("vegetariano");
  const content = DIET_CONTENT[active];

  return (
    <>
      {/* BOTONES */}
      <div className={styles.container}>
        {DIETS.map((diet) => (
          <button
            key={diet.key}
            className={`${styles.button} ${
              active === diet.key ? styles.active : ""
            } ${styles[diet.key]}`}
            onClick={() => setActive(diet.key)}
          >
            <span className={styles.circle} />
            <span className={styles.label}>{diet.label}</span>
          </button>
        ))}
      </div>

      {/* CONTENIDO INFERIOR */}
      <section
        className={`${styles.detail} ${styles[content.theme]}`}
        style={{ backgroundImage: `url(${content.fondo})` }}
      >
        <div className={styles.left}>
          <h2>{content.title}</h2>
          <p>{content.desc}</p>

          <div className={styles.stats}>
            {content.stats.map((s, i) => (
              <div key={i} className={styles.stat}>
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>

          <span className={styles.note}>Valores nutricionales promedio</span>

          <button className={styles.cta}>ARMAR MI PACK DE VIANDAS</button>
        </div>

        <div className={styles.right}>
          <img src={content.vianda} alt={content.title} />
        </div>
      </section>
    </>
  );
}
