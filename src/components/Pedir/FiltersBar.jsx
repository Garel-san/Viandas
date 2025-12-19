import styles from "./FiltersBar.module.css";
import { FiSearch, FiX } from "react-icons/fi";
import { useState, useRef } from "react";
import { useProductsData } from "../../context/ProductsDataContext";

export default function FiltersBar() {
  const {
    filtersConfig,
    activeFilters,
    searchValue,
    toggleFilter,
    setSearchValue,
    clearFilters,
  } = useProductsData();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const inputRef = useRef(null);

  // 🔹 Filtros superiores
  const topFilters = filtersConfig.filter((f) =>
    [
      "proteina",
      "gluten",
      "keto",
      "baja_caloria",
      "light",
      "vegetariano",
      "vegano",
      "extras",
    ].includes(f.id)
  );

  // 🔹 Filtros inferiores
  const bottomFilters = filtersConfig.filter(
    (f) => !topFilters.some((tf) => tf.id === f.id)
  );

  const hasActiveFilters = activeFilters.length > 0 || searchValue;

  return (
    <section className={styles.wrapper}>
      {/* ======================
          FILA SUPERIOR
          ====================== */}
      <div className={styles.chipsRow}>
        {topFilters.map((filter) => {
          const isActive = activeFilters.includes(filter.id);

          return (
            <button
              key={filter.id}
              type="button"
              className={`${styles.chip} ${isActive ? styles.active : ""}`}
              onClick={() => toggleFilter(filter.id)}
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      <div className={styles.divider} />

      {/* ======================
          FILA INFERIOR + SEARCH
          ====================== */}
      <div className={styles.bottomRow}>
        <div className={styles.chipsRow}>
          {bottomFilters.map((filter) => {
            const isActive = activeFilters.includes(filter.id);

            return (
              <button
                key={filter.id}
                type="button"
                className={`${styles.chip} ${isActive ? styles.active : ""}`}
                onClick={() => toggleFilter(filter.id)}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className={`${styles.search} ${isSearchOpen ? styles.open : ""}`}>
          <button
            type="button"
            className={styles.searchButton}
            onClick={() => {
              setIsSearchOpen(true);
              setTimeout(() => inputRef.current?.focus(), 150);
            }}
          >
            <FiSearch />
          </button>

          <input
            ref={inputRef}
            type="text"
            placeholder="Buscá tus platos favoritos..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onBlur={() => {
              if (!searchValue) setIsSearchOpen(false);
            }}
          />
        </div>

        {/* LIMPIAR FILTROS */}
        {hasActiveFilters && (
          <button
            type="button"
            className={styles.clearFilters}
            onClick={() => {
              setIsSearchOpen(false);
              clearFilters();
            }}
          >
            <FiX />
            Limpiar
          </button>
        )}
      </div>
    </section>
  );
}
