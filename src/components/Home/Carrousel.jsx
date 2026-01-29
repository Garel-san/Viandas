import { useEffect, useMemo, useRef, useState } from "react";
import Slider from "react-slick";
import styles from "./Carrousel.module.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

export default function Carrousel() {
  const sliderRef = useRef(null);

  const [w, setW] = useState(
    typeof window !== "undefined" ? window.innerWidth : 9999,
  );

  useEffect(() => {
    const onResize = () => setW(window.innerWidth);
    onResize();
    window.addEventListener("resize", onResize);
    window.visualViewport?.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      window.visualViewport?.removeEventListener("resize", onResize);
    };
  }, []);

  const slidesToShow = useMemo(() => {
    if (w <= 700) return 2;
    if (w <= 1200) return 3;
    return 4;
  }, [w]);

  const settings = useMemo(
    () => ({
      dots: false,
      infinite: true,
      speed: 500,
      slidesToScroll: 1,
      slidesToShow,

      // ✅ desactiva flechas nativas y usa las tuyas
      arrows: false,
    }),
    [slidesToShow],
  );

  return (
    <div className={styles.carouselShell}>
      {/* Flechas fuera del contenedor del Slider */}
      <button
        type="button"
        className={styles.arrowLeft}
        onClick={() => sliderRef.current?.slickPrev()}
        aria-label="Anterior"
      />
      <button
        type="button"
        className={styles.arrowRight}
        onClick={() => sliderRef.current?.slickNext()}
        aria-label="Siguiente"
      />

      {/* Contenedor “real” del carrusel */}
      <div className={styles.carouselContainer}>
        <Slider ref={sliderRef} {...settings}>
          {items.map((item, index) => (
            <div key={index} className={styles.slide}>
              <div className={styles.card}>
                <img src={item.img} alt={item.title} />
                <h3 className={styles.title}>{item.title}</h3>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
