import { useEffect, useMemo, useState } from "react";
import Slider from "react-slick";
import styles from "./Reviews.module.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const reviews = [
  {
    rating: 5,
    quote:
      "La calidad de las preparaciones es muy buena, condimentada pero no salada. La porcion ideal para almuerzo o cena.",
    author: "Teo",
    clientSince: "Review de Google",
    img: "/Reviews/Review 3.png",
  },
  {
    rating: 5,
    quote:
      "Sirven muy bien y con respeto, todo es muy sabroso y abundante. Hay mucha variedad de comidas, da gusto pedir!",
    author: "Ana",
    clientSince: "Review de Google",
    img: "/Reviews/Review.png",
  },
  {
    rating: 4,
    quote:
      "Llegan en tiempo y forma. Comida sabrosa y bien empacada. Las viandas duran 10 dias en excelentes condiciones.",
    author: "Felipe",
    clientSince: "Review de Google",
    img: "/Reviews/Review 2.png",
  },
  {
    rating: 5,
    quote:
      "Llevo tiempo usando sus servicios, aparte de la calidad de la comida, son puntuales y responden inquietudes rapidamente.",
    author: "Dominguez",
    clientSince: "Review de Google",
    img: "/Reviews/Review 4.png",
  },
  {
    rating: 5,
    quote:
      "Muy conforme con la calidad de las viandas, el servicio de entrega y la variedad que tienen. Hace 2 años que las solicito, muy practico para hacer el pedido online.",
    author: "María Corbo",
    clientSince: "Review de Google",
    img: "/Reviews/Review 5.png",
  },
  {
    rating: 5,
    quote:
      "Encontramos este servicio para colaborar con mi madre que tiene problemas de movilidad y le cuesta mucho cocinarse. Sinceramente un ÉXITO!",
    author: "Lic. Barragán Ana Elena",
    clientSince: "Review de Google",
    img: "/Reviews/Review 6.png",
  },
  {
    rating: 5,
    quote:
      "Hola, sirven muy bien y con respeto, todo es muy sabroso y abundante, hay mucha variedad de comidas... da gusto pedir ahí.",
    author: "Ana",
    clientSince: "Review de Google",
    img: "/Reviews/Review 7.png",
  },
  {
    rating: 5,
    quote:
      "Recomendable, soy comprador frecuente. Buena calidad a un precio razonable, se nota esfuerzo por mejorar siempre. Deberían agregar pagos online.",
    author: "Juan Pablo Pereira",
    clientSince: "Review de Google",
    img: "/Reviews/Review 8.png",
  },
  {
    rating: 5,
    quote:
      "1 minuto de micro y tengo mi comida hecha por profesionales, con una porción abundante, sabrosa y al mejor precio del mercado, y con un postre de regalo. Gracias por existir.",
    author: "Javier Lombardo Von",
    clientSince: "Review de Google",
    img: "/Reviews/Review 9.png",
  },
  {
    rating: 5,
    quote:
      "He comprado siete viandas, todas muy ricas. Un buen balance en sabores. Recomiendo.",
    author: "Cristina Rolfi",
    clientSince: "Review de Google",
    img: "/Reviews/Review 10.png",
  },
];

export default function Reviews() {
  const [is4k, setIs4k] = useState(false);

  useEffect(() => {
    const compute = () => {
      const dpr = window.devicePixelRatio || 1;

      // "tamaño efectivo" (aprox. físico) para cubrir casos donde el CSS width sea menor por DPR alto
      const effectiveW = window.innerWidth * dpr;
      const effectiveH = window.innerHeight * dpr;

      setIs4k(effectiveW >= 2560 && effectiveH >= 1063);
    };

    compute();
    window.addEventListener("resize", compute);
    window.addEventListener("orientationchange", compute);

    return () => {
      window.removeEventListener("resize", compute);
      window.removeEventListener("orientationchange", compute);
    };
  }, []);

  const settings = useMemo(
    () => ({
      dots: false,
      infinite: true,
      speed: 500,

      // ✅ En "normal" (no 4K) se ven 2; cuando alcanza 2560x1063 (efectivo) se ven 3
      slidesToShow: is4k ? 3 : 2,
      slidesToScroll: 1,

      centerMode: true,
      centerPadding: "0px",

      // ✅ móviles/tablets siguen igual
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 399,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    }),
    [is4k],
  );

  return (
    <div className={styles.reviewsCarouselContainer}>
      <Slider {...settings}>
        {reviews.map((review, index) => (
          <div key={index} className={styles.reviewCard}>
            <div className={styles.reviewRating}>
              {[...Array(5)].map((_, i) =>
                i < review.rating ? (
                  <span key={i} className={styles.starFilled}>
                    ★
                  </span>
                ) : (
                  <span key={i} className={styles.starEmpty}>
                    ★
                  </span>
                ),
              )}
            </div>

            <div className={styles.quoteContenedor}>
              <p className={styles.reviewQuote}>“{review.quote}”</p>
            </div>

            <div className={styles.reviewAuthor}>
              <img
                src={review.img}
                alt={review.author}
                className={styles.authorImg}
              />
              <div>
                <p className={styles.authorName}>{review.author}</p>
                <p className={styles.clientSince}>{review.clientSince}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
