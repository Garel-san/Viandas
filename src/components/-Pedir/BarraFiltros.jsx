import styles from "./BarraFiltros.module.css";
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
    ].includes(f.id),
  );

  const bottomFilters = filtersConfig.filter(
    (f) => !topFilters.some((tf) => tf.id === f.id),
  );

  const hasActiveFilters = activeFilters.length > 0 || searchValue;

  return (
    <>
      <section className={styles.stickyWrapper}>
        <div className={styles.wrapper}>
          {/* ================= FILA SUPERIOR ================= */}
          <div className={`${styles.chipsRow} ${styles.scrollRow}`}>
            {topFilters.map((filter) => {
              const isActive = activeFilters.includes(filter.id);

              return (
                <button
                  key={filter.id}
                  type="button"
                  className={`${styles.chip} ${isActive ? styles.active : ""}`}
                  onClick={() => toggleFilter(filter.id)}
                >
                  <span>{filter.label}</span>
                </button>
              );
            })}
          </div>

          <div className={styles.divider} />

          {/* ================= FILA INFERIOR ================= */}
          <div className={styles.bottomRow}>
            <div className={`${styles.chipsRow} ${styles.scrollRow}`}>
              {bottomFilters.map((filter) => {
                const isActive = activeFilters.includes(filter.id);

                return (
                  <button
                    key={filter.id}
                    type="button"
                    className={`${styles.chip} ${
                      isActive ? styles.active : ""
                    }`}
                    onClick={() => toggleFilter(filter.id)}
                  >
                    {filter.id === "favoritos" && (
                      <span className={styles.favoriteStar} aria-hidden />
                    )}
                    <span>{filter.label}</span>
                  </button>
                );
              })}
            </div>

            {/* ================= LIMPIAR + SEARCH ================= */}
            <div className={styles.searchGroup}>
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
                  Limpiar filtros
                </button>
              )}

              <div
                className={`${styles.search} ${
                  isSearchOpen ? styles.open : ""
                }`}
              >
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
                  placeholder="Buscá por plato o ingrediente…"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onBlur={() => {
                    if (!searchValue) setIsSearchOpen(false);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
