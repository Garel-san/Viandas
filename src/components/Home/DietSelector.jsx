import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./DietSelector.module.css";

const DIETS = [
  { key: "vegetariano", label: "Vegetariano" },
  { key: "fitness", label: "Fitness" },
  { key: "proteina", label: "Proteína+" },
  { key: "keto", label: "Keto" },
  { key: "gluten", label: "Gluten Free" },
  { key: "baja", label: "Baja caloría" },
];

/* 🔹 PLATOS RANDOM POR DIETA */
const DIET_PLATES = {
  vegetariano: [
    "/Diets/vegetariano_vianda.webp",
    "/Diets/VEGETARIANO 1.png",
    "/Diets/VEGETARIANO 2.png",
    "/Diets/VEGETARIANO 3.png",
  ],
  fitness: [
    "/Diets/fitness_vianda.webp",
    "/Diets/FITNESS 1.png",
    "/Diets/FITNESS 2.png",
    "/Diets/FITNESS 3.png",
  ],
  proteina: [
    "/Diets/proteina_vianda.webp",
    "/Diets/PROTE 1.png",
    "/Diets/PROTE 2.png",
    "/Diets/PROTE 3.png",
  ],
  keto: [
    "/Diets/keto_vianda.webp",
    "/Diets/KETO 1.png",
    "/Diets/KETO 2.png",
    "/Diets/KETO 3.png",
  ],
  gluten: [
    "/Diets/singluten_vianda.webp",
    "/Diets/GLUTEN 1.png",
    "/Diets/GLUTEN 2.png",
    "/Diets/GLUTEN 3.png",
  ],
  baja: [
    "/Diets/bajacaloria_vianda.webp",
    "/Diets/BAJA 1.png",
    "/Diets/BAJA 2.png",
    "/Diets/BAJA 3.png",
  ],
};

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
    fondo: "/Diets/vegetariano_fondo.webp",
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
    fondo: "/Diets/fitness_fondo.webp",
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
    fondo: "/Diets/proteina_fondo.webp",
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
    fondo: "/Diets/keto_fondo.webp",
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
    fondo: "/Diets/singluten_fondo.webp",
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
    fondo: "/Diets/bajacaloria_fondo.webp",
    theme: "low",
  },
};

/* 🔹 helper random */
const getRandomPlate = (dietKey) => {
  const plates = DIET_PLATES[dietKey];
  return plates[Math.floor(Math.random() * plates.length)];
};

export default function DietSelector() {
  const [active, setActive] = useState("vegetariano");
  const [plateImage, setPlateImage] = useState(getRandomPlate("vegetariano"));

  const navigate = useNavigate();
  const content = DIET_CONTENT[active];

  const handleSelectDiet = (dietKey) => {
    setActive(dietKey);
    setPlateImage(getRandomPlate(dietKey));
  };

  const handleGoToPedir = () => {
    navigate("/pedir");
  };

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
            onClick={() => handleSelectDiet(diet.key)}
          >
            <span className={styles.circle} />
            <span className={styles.label}>{diet.label}</span>
          </button>
        ))}
      </div>

      {/* CONTENIDO */}
      <section
        className={`${styles.detail} ${styles[content.theme]}`}
        style={{ backgroundImage: `url(${content.fondo})` }}
      >
        <div className={styles.left}>
          {/* 👇 NUEVO WRAPPER INTERNO */}
          <div className={styles.leftContent}>
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

            <button className={styles.cta} onClick={handleGoToPedir}>
              ARMAR MI PACK DE VIANDAS
            </button>
          </div>
        </div>

        <div className={styles.right}>
          <img src={plateImage} alt={content.title} />
        </div>
      </section>
    </>
  );
}
