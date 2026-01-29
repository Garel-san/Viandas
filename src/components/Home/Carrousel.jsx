import { useEffect, useRef, useState } from "react";
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

  const [metrics, setMetrics] = useState({
    innerWidth: 0,
    innerHeight: 0,
    screenW: 0,
    screenH: 0,
    dpr: 0,
    vvW: null,
    vvH: null,
    vvScale: null,
  });

  useEffect(() => {
    const update = () => {
      setMetrics({
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
        screenW: screen.width,
        screenH: screen.height,
        dpr: window.devicePixelRatio,
        vvW: window.visualViewport?.width ?? null,
        vvH: window.visualViewport?.height ?? null,
        vvScale: window.visualViewport?.scale ?? null,
      });
    };

    update();

    window.addEventListener("resize", update);
    window.visualViewport?.addEventListener("resize", update);

    return () => {
      window.removeEventListener("resize", update);
      window.visualViewport?.removeEventListener("resize", update);
    };
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    slidesToShow: 4,
    arrows: false,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 3 } },
      { breakpoint: 700, settings: { slidesToShow: 2 } },
    ],
  };

  return (
    <div className={styles.carouselContainer}>
      {/* DEBUG EN PANTALLA (temporal) */}
      <div
        style={{
          fontSize: 12,
          color: "red",
          marginBottom: 8,
          wordBreak: "break-word",
        }}
      >
        inner: {metrics.innerWidth}×{metrics.innerHeight} | screen:{" "}
        {metrics.screenW}×{metrics.screenH} | dpr: {metrics.dpr} | vv:{" "}
        {metrics.vvW ?? "-"}×{metrics.vvH ?? "-"} | scale:{" "}
        {metrics.vvScale ?? "-"}
      </div>

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
  );
}
