import { useState, useRef } from "react";
import styles from "./PreguntasFrecuentesSub.module.css";

const FAQS = [
  {
    title: "¿Cuando y a que hora es la entrega?",
    content: (
      <p>
        En Viandas Hotel del Prado, hemos ajustado nuestros horarios de entrega
        para brindarte un mejor servicio. A partir de ahora, realizaremos
        entregas desde las 8:00 AM hasta las 16:00 PM. Nosotros nos
        comunicaremos contigo para coordinar la entrega
      </p>
    ),
  },
  {
    title: "¿Con que condimentos trabajan?",
    content: (
      <p>
        No agregamos sal ni pimienta como condimentos directos en nuestras
        preparaciones. En su lugar, utilizamos hierbas, especias naturales y
        condimentos aptos para una amplia variedad de necesidades alimentarias.
        Sin embargo, algunos ingredientes que utilizamos (como quesos o caldos)
        pueden contener sodio en su composición natural.
      </p>
    ),
  },
  {
    title: "¿Cuanto duran?",
    content: (
      <p>
        De ser guardadas en la heladera, recomendamos consumir nuestras viandas
        en los 10 días próximos a su entrega. Sin embargo, la vida útil de las
        mismas puede llegar a ser de hasta 2 semanas.
      </p>
    ),
  },
  {
    title: "¿Se pueden congelar?",
    content: (
      <p>
        Las viandas se pueden congelar para una mayor vida útil. No obstante,
        deberás tener en cuenta que cuando se congelen, pierden la capacidad de
        mantenerse en la heladera y es probable que el sabor, frescura y calidad
        de los alimentos se vean reducidos.
      </p>
    ),
  },
  {
    title: "¿Cual es el tamaño de la porcion?",
    content: (
      <p>
        Nuestras viandas se encuentran por encima de los 450 gramos, esta
        porción alimenta y satisface a un hombre adulto. Esta cantidad puede
        variar al armar tu pedido con viandas XL, que permiten seleccionar hasta
        dos guarniciones.
      </p>
    ),
  },
];

function ChevronIcon({ className }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        d="M6.7 9.3a1 1 0 0 1 1.4 0L12 13.2l3.9-3.9a1 1 0 1 1 1.4 1.4l-4.6 4.6a1 1 0 0 1-1.4 0l-4.6-4.6a1 1 0 0 1 0-1.4z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function FaqAccordionSub() {
  const [openIndexes, setOpenIndexes] = useState([]);
  const contentRefs = useRef([]);

  const toggle = (index) => {
    setOpenIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        {FAQS.map((faq, index) => {
          const isOpen = openIndexes.includes(index);
          const el = contentRefs.current[index];
          const maxH = isOpen ? `${el?.scrollHeight || 0}px` : "0px";

          return (
            <div key={index} className={styles.item}>
              <button
                className={styles.header}
                onClick={() => toggle(index)}
                aria-expanded={isOpen}
              >
                <h3 className={styles.title}>{faq.title}</h3>

                <span className={`${styles.icon} ${isOpen ? styles.open : ""}`}>
                  <ChevronIcon />
                </span>
              </button>

              <hr className={styles.divider} />

              <div
                className={styles.content}
                ref={(node) => (contentRefs.current[index] = node)}
                style={{ maxHeight: maxH }}
              >
                <div className={styles.inner}>{faq.content}</div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
