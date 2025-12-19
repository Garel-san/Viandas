import styles from "./Reviews.module.css";

const reviews = [
  {
    name: "Teo",
    stars: 5,
    text: "La calidad de las preparaciones es muy buena, condimentada pero no salada. La porcion ideal para almuerzo o cena.",
    img: "/Review 3.png",
  },
  {
    name: "Ana",
    stars: 5,
    text: "Sirven muy bien y con respeto, todo es muy sabroso y abundante. Hay mucha variedad de comidas, da gusto pedir!",
    img: "/Review.png",
  },
  {
    name: "Felipe",
    stars: 4,
    text: "Llegan en tiempo y forma. Comida sabrosa y bien empacada. Las viandas duran 10 dias en excelentes condiciones.",
    img: "/Review 2.png",
  },
  {
    name: "Dominguez",
    stars: 5,
    text: "Llevo tiempo usando sus servicios, aparte de la calidad de la comida, son puntuales y responden inquietudes rapidamente.",
    img: "/Review 4.png",
  },
  {
    name: "María Corbo",
    stars: 5,
    text: "Muy conforme con la calidad de las viandas, el servicio de entrega y la variedad que tienen. Hace 2 años que las solicito, muy practico para hacer el pedido online.",
    img: "/Review 5.png",
  },
  {
    name: "Lic. Barragán Ana Elena",
    stars: 5,
    text: "Encontramos este servicio para colaborar con mi madre que tiene problemas de movilidad y le cuesta mucho cocinarse. Sinceramente un ÉXITO!",
    img: "/Review 6.png",
  },
  {
    name: "Ana",
    stars: 5,
    text: "Hola, sirven muy bien y con respeto, todo es muy sabroso y abundante, hay mucha variedad de comidas... da gusto pedir ahí.",
    img: "/Review 7.png",
  },
  {
    name: "Juan Pablo Pereira",
    stars: 5,
    text: "Recomendable, soy comprador frecuente. Buena calidad a un precio razonable, se nota esfuerzo por mejorar siempre. Deberían agregar pagos online.",
    img: "/Review 8.png",
  },
  {
    name: "Javier Lombardo Von",
    stars: 5,
    text: "1 minuto de micro y tengo mi comida hecha por profesionales, con una porción abundante, sabrosa y al mejor precio del mercado, y con un postre de regalo. Gracias por existir.",
    img: "/Review 9.png",
  },
  {
    name: "Cristina Rolfi",
    stars: 5,
    text: "He comprado siete viandas, todas muy ricas. Un buen balance en sabores. Recomiendo.",
    img: "/Review 10.png",
  },
];

export default function Reviews() {
  return (
    <section className={styles.wrapper}>
      <div className={styles.viewport}>
        <div className={styles.track}>
          {[...reviews, ...reviews].map((r, i) => (
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
      </div>
    </section>
  );
}
