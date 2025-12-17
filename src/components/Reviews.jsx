import { useRef, useState } from "react";
import styles from "./Reviews.module.css";

const reviews = [
  {
    name: "Teo",
    stars: 5,
    text: "La calidad de las preparaciones es muy buena, condimentada pero no salada. La porcion ideal para almuerzo o cena.",
    img: "/review3.png",
  },
  {
    name: "Ana",
    stars: 5,
    text: "Sirven muy bien y con respeto, todo es muy sabroso y abundante. Hay mucha variedad de comidas, da gusto pedir!",
    img: "/review.png",
  },
  {
    name: "Felipe",
    stars: 4,
    text: "Llegan en tiempo y forma. Comida sabrosa y bien empacada. Las viandas duran 10 dias en excelentes condiciones.",
    img: "/review2.png",
  },
  {
    name: "Dominguez",
    stars: 5,
    text: "Llevo tiempo usando sus servicios, aparte de la calidad de la comida, son puntuales y responden inquietudes rapidamente.",
    img: "/review4.png",
  },
];

export default function Reviews() {
  const trackRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startScroll = useRef(0);

  const onPointerDown = (e) => {
    isDragging.current = true;
    trackRef.current.classList.add(styles.dragging);
    startX.current = e.clientX;
    startScroll.current = trackRef.current.scrollLeft;
    trackRef.current.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (!isDragging.current) return;
    const dx = e.clientX - startX.current;
    trackRef.current.scrollLeft = startScroll.current - dx;
  };

  const onPointerUp = (e) => {
    isDragging.current = false;
    trackRef.current.classList.remove(styles.dragging);
    trackRef.current.releasePointerCapture(e.pointerId);
  };

  return (
    <section className={styles.wrapper}>
      <div
        ref={trackRef}
        className={styles.track}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        {reviews.map((r, i) => (
          <div className={styles.card} key={i}>
            <div className={styles.stars}>
              {Array.from({ length: 5 }).map((_, idx) => (
                <span
                  key={idx}
                  className={idx < r.stars ? styles.filled : styles.empty}
                >
                  ★
                </span>
              ))}
            </div>

            <p className={styles.text}>"{r.text}"</p>

            <div className={styles.user}>
              <img src={r.img} alt={r.name} />
              <div>
                <strong>{r.name}</strong>
                <span>Review de Google</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
