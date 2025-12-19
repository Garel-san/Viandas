import { useState, useEffect, useRef } from "react";
import styles from "./Carrousel.module.css";

const items = [
  { title: "Albondigas de carne", img: "/Carousel/carousel1.webp" },
  { title: "Dados de pollo al ajillo", img: "/Carousel/carousel2.webp" },
  { title: "Omelette de Vegetales", img: "/Carousel/carousel3.webp" },
  { title: "Pasta con vegetales", img: "/Carousel/carousel4.webp" },
  { title: "Ensalada de rúcula", img: "/Carousel/Carousel5.png" },
  { title: "Merluza salsa verde", img: "/Carousel/Carousel6.png" },
  { title: "Medallón de cerdo", img: "/Carousel/Carousel7.png" },
  { title: "Milanesa de pescado", img: "/Carousel/Carousel8.png" },
  { title: "Tarta de jamón", img: "/Carousel/Carousel9.png" },
  { title: "Tortilla española", img: "/Carousel/Carousel10.png" },
];

const GAP = 24;

export default function Carrousel() {
  const TOTAL = items.length;
  const extendedItems = [...items, ...items, ...items];

  const [index, setIndex] = useState(TOTAL);
  const [animate, setAnimate] = useState(true);
  const [step, setStep] = useState(0);

  const cardRef = useRef(null);
  const trackRef = useRef(null);

  // Medimos ancho real de una card + gap
  useEffect(() => {
    if (cardRef.current) {
      const cardWidth = cardRef.current.offsetWidth;
      setStep(cardWidth + GAP);
    }
  }, []);

  const next = () => {
    setAnimate(true);
    setIndex((i) => i + 1);
  };

  const prev = () => {
    setAnimate(true);
    setIndex((i) => i - 1);
  };

  // 🔑 RESET SINCRONIZADO CON LA ANIMACIÓN REAL
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const handleTransitionEnd = () => {
      if (index >= TOTAL * 2) {
        setAnimate(false);
        setIndex(TOTAL);
      }

      if (index < TOTAL) {
        setAnimate(false);
        setIndex(TOTAL + index);
      }
    };

    track.addEventListener("transitionend", handleTransitionEnd);
    return () => {
      track.removeEventListener("transitionend", handleTransitionEnd);
    };
  }, [index, TOTAL]);

  return (
    <section className={styles.wrapper}>
      <button className={styles.arrowLeft} onClick={prev}>
        ‹
      </button>

      <div className={styles.viewport}>
        <div
          ref={trackRef}
          className={styles.track}
          style={{
            transform: `translateX(-${index * step}px)`,
            transition: animate
              ? "transform 0.45s cubic-bezier(0.4, 0, 0.2, 1)"
              : "none",
          }}
        >
          {extendedItems.map((item, i) => (
            <div className={styles.card} key={i} ref={i === 0 ? cardRef : null}>
              <img src={item.img} alt={item.title} />
              <div className={styles.titleOverlay}>
                <span className={styles.title}>{item.title}</span>
              </div>
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
