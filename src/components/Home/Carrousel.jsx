import { useRef } from "react";
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

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    slidesToShow: 4,

    // ✅ desactiva arrows internas de slick
    arrows: false,

    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 3 } },
      { breakpoint: 700, settings: { slidesToShow: 2 } },
    ],
  };

  return (
    <div className={styles.carouselContainer}>
      {/* ✅ flechas fuera del Slider */}
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
