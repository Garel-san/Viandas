import { useState, useRef } from "react";
import styles from "./FaqAccordion.module.css";

const FAQS = [
  {
    title: "¿Cuando y a qué hora es la entrega?",
    content: (
      <>
        <p>
          En Viandas Hotel del Prado, hemos ajustado nuestros horarios de
          entrega para brindarte un mejor servicio. A partir de ahora,
          realizaremos entregas desde las 8:00 AM hasta las 16:00 PM. Nosotros
          nos comunicaremos contigo para coordinar la entrega, ¡hacé el pedido y
          despreocupate! Solo los pedidos realizados antes de las 15:00 hs
          podrán ser entregados en el siguiente día. Si hiciste un pedido
          después de las 15:00 hs deberá ser reprogramado, por favor contactate
          con nosotros.
        </p>

        <p>
          Si necesitas una entrega fuera de este horario, con gusto te la
          llevaremos, pero ten en cuenta que se cobrará un costo adicional por
          el envío. Para coordinarlo, asegurate de avisarnos con antelación o
          especificarlo en los comentarios al hacer tu pedido.
        </p>

        <p>¡Gracias por confiar en nosotros para tus comidas diarias!</p>
      </>
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
    title: "¿Cuánto duran?",
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
      <>
        <p>
          Las viandas se pueden congelar para una mayor vida útil. No obstante,
          deberás tener en cuenta que cuando se congelen, pierden la capacidad
          de mantenerse en la heladera y es probable que el sabor, frescura y
          calidad de los alimentos se vean reducidos.
        </p>

        <p>
          Cabe destacar que nuestros guisos son el único plato que se entrega
          previamente congelado, ya que su alta demanda requiere una producción
          en grandes volúmenes. Este proceso está cuidadosamente controlado para
          preservar al máximo su sabor y calidad.
        </p>
      </>
    ),
  },
  {
    title: "¿Cuál es el tamaño de la porción?",
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
      focusable="false"
    >
      <path
        d="M6.7 9.3a1 1 0 0 1 1.4 0L12 13.2l3.9-3.9a1 1 0 1 1 1.4 1.4l-4.6 4.6a1 1 0 0 1-1.4 0l-4.6-4.6a1 1 0 0 1 0-1.4z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function FaqAccordion({ variant }) {
  const [openIndexes, setOpenIndexes] = useState([]);
  const contentRefs = useRef([]);

  const isBoldTitles = variant === "bold-titles";

  const toggle = (index) => {
    setOpenIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  return (
    <section className={styles.faqSection}>
      {FAQS.map((faq, index) => {
        const isOpen = openIndexes.includes(index);
        const el = contentRefs.current[index];
        const maxH = isOpen ? `${el?.scrollHeight || 0}px` : "0px";

        return (
          <div key={index} className={styles.faqItem}>
            <button
              className={styles.faqHeader}
              onClick={() => toggle(index)}
              type="button"
              aria-expanded={isOpen}
            >
              <h3
                className={`${styles.faqTitle} ${
                  isBoldTitles ? styles.faqTitleBold : ""
                }`}
              >
                {faq.title}
              </h3>

              <span
                className={`${styles.faqIcon} ${isOpen ? styles.open : ""}`}
                aria-hidden="true"
              >
                <ChevronIcon className={styles.chevron} />
              </span>
            </button>

            <hr className={styles.divider} />

            <div
              className={styles.faqContent}
              ref={(node) => {
                contentRefs.current[index] = node;
              }}
              style={{ maxHeight: maxH }}
            >
              <div className={styles.faqInner}>{faq.content}</div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
