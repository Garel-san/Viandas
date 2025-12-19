import ProductCard from "./ProductCard";
import styles from "./ProductsGrid.module.css";
import { useProductsData } from "../../context/ProductsDataContext";

export default function ProductsGrid() {
  const { filteredProducts } = useProductsData();

  if (!filteredProducts.length) {
    return (
      <div className={styles.empty}>
        <p>No se encontraron productos para los filtros seleccionados.</p>
      </div>
    );
  }

  return (
    <section className={styles.grid}>
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  );
}
