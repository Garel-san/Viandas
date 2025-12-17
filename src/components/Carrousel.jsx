import { useState } from "react";
import styles from "./Carrousel.module.css";

const items = [
  { title: "Albondigas de carne", img: "/carousel1.webp" },
  { title: "Dados de pollo al ajillo", img: "/carousel2.webp" },
  { title: "Omelette de Vegetales", img: "/carousel3.webp" },
  { title: "Pasta con vegetales", img: "/carousel4.webp" },
];

export default function Carrousel() {
  const [index, setIndex] = useState(0);

  const next = () => {
    setIndex((prev) => prev + 1);
  };

  const prev = () => {
    setIndex((prev) => prev - 1);
  };

  return (
    <section className={styles.wrapper}>
      <button className={styles.arrowLeft} onClick={prev}>
        ‹
      </button>

      <div className={styles.viewport}>
        <div
          className={styles.track}
          style={{
            transform: `translateX(-${(index % items.length) * 25}%)`,
          }}
        >
          {/* duplicamos varias veces para garantizar continuidad */}
          {[...items, ...items, ...items].map((item, i) => (
            <div className={styles.card} key={i}>
              <img src={item.img} alt={item.title} />
              <span>{item.title}</span>
            </div>
          ))}
        </div>
      </div>

      <button className={styles.arrowRight} onClick={next}>
        ›
      </button>
    </section>
  );
}
