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

const THEME_MAP = {
  vegetariano: styles.veg,
  fitness: styles.fit,
  proteina: styles.pro,
  keto: styles.keto,
  gluten: styles.glu,
  baja: styles.low,
};

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
    header: "VEGETARIANO",
    description:
      "Platos especialmente preparados por nutricionistas para darle a tu cuerpo el combustible que necesita.",
    nutritionValues: [
      "45g Carbos",
      "16g Proteínas",
      "28g Grasas",
      "510 Calorías",
    ],
    fondo: "/Diets/vegetariano_fondo.webp",
  },
  fitness: {
    header: "FITNESS",
    description:
      "Platos especialmente preparados por nutricionistas para darle a tu cuerpo el combustible que necesita.",
    nutritionValues: [
      "38g Carbos",
      "34g Proteínas",
      "18g Grasas",
      "480 Calorías",
    ],
    fondo: "/Diets/fitness_fondo.webp",
  },
  proteina: {
    header: "PROTEÍNA+",
    description:
      "Platos especialmente preparados por nutricionistas para darle a tu cuerpo el combustible que necesita.",
    nutritionValues: [
      "25g Carbos",
      "40g Proteínas",
      "12g Grasas",
      "490 Calorías",
    ],
    fondo: "/Diets/proteina_fondo.webp",
  },
  keto: {
    header: "KETO",
    description:
      "Platos especialmente preparados por nutricionistas para darle a tu cuerpo el combustible que necesita.",
    nutritionValues: [
      "11g Carbos",
      "42g Proteínas",
      "24g Grasas",
      "460 Calorías",
    ],
    fondo: "/Diets/keto_fondo.webp",
  },
  gluten: {
    header: "SIN GLUTEN",
    description:
      "Platos especialmente preparados por nutricionistas para darle a tu cuerpo el combustible que necesita.",
    nutritionValues: [
      "18g Carbos",
      "36g Proteínas",
      "14g Grasas",
      "390 Calorías",
    ],
    fondo: "/Diets/singluten_fondo.webp",
  },
  baja: {
    header: "BAJA CALORÍA",
    description:
      "Platos especialmente preparados por nutricionistas para darle a tu cuerpo el combustible que necesita.",
    nutritionValues: [
      "30g Carbos",
      "26g Proteínas",
      "9g Grasas",
      "350 Calorías",
    ],
    fondo: "/Diets/bajacaloria_fondo.webp",
  },
};

const getRandomPlate = (dietKey) => {
  const plates = DIET_PLATES[dietKey];
  return plates[Math.floor(Math.random() * plates.length)];
};

export default function DietSelector() {
  const [active, setActive] = useState("proteina");
  const [plateImage, setPlateImage] = useState(getRandomPlate("proteina"));

  const navigate = useNavigate();
  const content = DIET_CONTENT[active];
  const themeClass = THEME_MAP[active];

  const triggerRipple = (e) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    btn.style.setProperty("--ripple-x", `${e.clientX - rect.left}px`);
    btn.style.setProperty("--ripple-y", `${e.clientY - rect.top}px`);
    btn.classList.remove(styles.rippling);
    void btn.offsetWidth;
    btn.classList.add(styles.rippling);
  };

  return (
    <>
      {/* BOTONES DIETA (estructura tipo DietButton original) */}
      <div className={styles.container}>
        {DIETS.map((diet) => {
          const selected = active === diet.key;

          return (
            <button
              key={diet.key}
              type="button"
              className={`${styles.button} ${styles[diet.key]} ${
                selected ? styles.active : ""
              }`}
              onPointerDown={triggerRipple}
              onClick={() => {
                setActive(diet.key);
                setPlateImage(getRandomPlate(diet.key));
              }}
            >
              {/* Indicador tipo Radio (equivalente al <Radio /> de MUI) */}
              <span
                className={styles.circle}
                aria-hidden="true"
                data-checked={selected}
              />

              {/* Label */}
              <span className={styles.label}>{diet.label}</span>
            </button>
          );
        })}
      </div>

      {/* CONTENIDO DIETA (estructura original real) */}
      <div
        className={`${styles["diet-content-container"]} ${themeClass}`}
        style={{ backgroundImage: `url(${content.fondo})` }}
      >
        <div className={styles["diet-content-father"]}>
          <div className={styles["diet-content-izquierda"]}>
            <p className={styles["diet-header"]}>{content.header}</p>

            <p className={styles["diet-description"]}>{content.description}</p>

            <div className={styles["nutrition-values-container"]}>
              {content.nutritionValues.map((value, i) => {
                const [amount, label] = value.split(" ");
                return (
                  <div key={i} className={styles["nutrition-box"]}>
                    <p className={styles["nutrition-amount"]}>{amount}</p>
                    <p className={styles["nutrition-description"]}>{label}</p>
                  </div>
                );
              })}
            </div>

            <p className={styles["nutrition-footer"]}>
              Valores nutricionales promedio
            </p>

            <div className={styles["cta-button-container"]}>
              <button className={styles.cta} onClick={() => navigate("/pedir")}>
                ARMAR MI PACK DE VIANDAS
              </button>
            </div>
          </div>

          <div className={styles["diet-content-derecha"]}>
            <img
              src={plateImage}
              alt={content.header}
              className={styles["hero-image"]}
            />
          </div>
        </div>
      </div>
    </>
  );
}
