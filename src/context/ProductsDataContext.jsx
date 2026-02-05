import { createContext, useContext, useMemo, useState } from "react";

/* ======================
   CONTEXT
====================== */
const ProductsDataContext = createContext(null);

/* ======================
   PROVIDER
====================== */
export function ProductsDataProvider({ children }) {
  /* ======================
     CONFIG DE FILTROS
  ====================== */
  const filtersConfig = [
    { id: "proteina", label: "Proteína+" },
    { id: "gluten", label: "Gluten Free" },
    { id: "keto", label: "Keto" },
    { id: "baja_caloria", label: "Baja caloría" },
    { id: "light", label: "Light" },
    { id: "vegetariano", label: "Vegetariano" },
    { id: "vegano", label: "Vegano" },
    { id: "extras", label: "Extras" },
    { id: "favoritos", label: "Favoritos" },
    { id: "nuevos", label: "¡Nuevos!" },
    { id: "carnes", label: "Carnes" },
    { id: "invierno", label: "Invierno" },
    { id: "pollo", label: "Pollo" },
    { id: "pastas", label: "Pastas" },
    { id: "ensaladas", label: "Ensaladas" },
    { id: "pescado", label: "Pescado" },
    { id: "tartas", label: "Tartas y Empanadas" },
  ];

  /* ======================
     PRODUCTOS (mock)
  ====================== */
  const [products] = useState([
    {
      id: "p1",
      title:
        "Medallón de cerdo, envuelto en panceta a la plancha, salsa de miel y mostaza",
      image: "/products/medallon-cerdo.webp",
      basePrice: 330,
      allowsXL: true,
      tags: ["carnes", "proteina", "invierno"],
      garnishes: [
        { id: "arroz", label: "Arroz", extra: 0 },
        { id: "boniatos", label: "Boniatos glaseados", extra: 50 },
      ],
    },
    {
      id: "p2",
      title: "Ensalada de rúcula con parmesano, mermelada de cebolla y pollo",
      image: "/products/ensalada-rucula.webp",
      basePrice: 330,
      allowsXL: true,
      tags: ["ensaladas", "pollo", "proteina", "light"],
      garnishes: [],
    },
    {
      id: "p3",
      title: "Canelones de carne picada, marinada con especias y salsa blanca",
      image: "/products/canelon.webp",
      basePrice: 330,
      allowsXL: true,
      tags: ["pastas", "carnes", "invierno"],
      garnishes: [],
    },
    {
      id: "p4",
      title: "Bifes de cuadril, salteados con cebollas, manteca y vino tinto",
      image: "/products/bife-cuadril.webp",
      basePrice: 330,
      allowsXL: true,
      tags: ["carnes", "proteina", "invierno"],
      garnishes: [
        { id: "arroz", label: "Arroz", extra: 0 },
        { id: "pure", label: "Puré", extra: 40 },
      ],
    },
    {
      id: "p5",
      title: "Suprema de pollo rellena de panceta y puerros con guarnición",
      image: "/products/suprema-rellena.webp",
      basePrice: 330,
      allowsXL: true,
      tags: ["pollo", "proteina"],
      garnishes: [
        { id: "arroz", label: "Arroz", extra: 0 },
        { id: "ensalada", label: "Ensalada fresca", extra: 0 },
      ],
    },
    {
      id: "p6",
      title: "Zapallitos rellenos de verduras, gratinados con muzzarella",
      image: "/products/zapallito-relleno-verduras.webp",
      basePrice: 330,
      allowsXL: false,
      tags: ["vegetariano", "baja_caloria"],
      garnishes: [],
    },
    {
      id: "p7",
      title: "Torres de vegetales grillados con muzzarella gratinada",
      image: "/products/torre-vegetales.webp",
      basePrice: 330,
      allowsXL: false,
      tags: ["vegetariano", "light"],
      garnishes: [],
    },
    {
      id: "p8",
      title: "Hamburguesas caseras con salsa 3 quesos",
      image: "/products/hambur-casera.webp",
      basePrice: 330,
      allowsXL: true,
      tags: ["carnes", "proteina"],
      garnishes: [
        { id: "papas", label: "Papas rústicas", extra: 50 },
        { id: "ensalada", label: "Ensalada fresca", extra: 0 },
      ],
    },

    /* ======================
       NUEVOS PRODUCTOS
    ====================== */

    {
      id: "p9",
      title: "Pamplona de Cerdo",
      image: "/products/pamplona-cerdo.webp",
      basePrice: 330,
      allowsXL: true,
      tags: ["carnes", "proteina", "invierno", "nuevos"],
      garnishes: [
        { id: "pure", label: "Puré", extra: 40 },
        { id: "papas", label: "Papas al horno", extra: 50 },
      ],
    },
    {
      id: "p10",
      title: "Ensalada Verde",
      image: "/products/ensalada-verde.webp",
      basePrice: 330,
      allowsXL: false,
      tags: ["ensaladas", "vegano", "light", "baja_caloria"],
      garnishes: [],
    },
    {
      id: "p11",
      title: "Chop Suey con Champiñones",
      image: "/products/chop-suey-champi.webp",
      basePrice: 330,
      allowsXL: false,
      tags: ["vegetariano", "light"],
      garnishes: [],
    },
    {
      id: "p12",
      title: "Pechuga con Espinacas",
      image: "/products/pechuga-espinacas.webp",
      basePrice: 330,
      allowsXL: true,
      tags: ["pollo", "proteina", "light"],
      garnishes: [{ id: "arroz", label: "Arroz", extra: 0 }],
    },
    {
      id: "p13",
      title: "Milanesa de Pescado",
      image: "/products/milanesa-pescado.webp",
      basePrice: 330,
      allowsXL: true,
      tags: ["pescado", "proteina"],
      garnishes: [
        { id: "pure", label: "Puré", extra: 40 },
        { id: "ensalada", label: "Ensalada fresca", extra: 0 },
      ],
    },
    {
      id: "p14",
      title: "Cordero con Curry",
      image: "/products/cordero-curry.webp",
      basePrice: 330,
      allowsXL: true,
      tags: ["carnes", "proteina", "invierno"],
      garnishes: [{ id: "arroz", label: "Arroz especiado", extra: 0 }],
    },
    {
      id: "p15",
      title: "Crepes de Espinaca",
      image: "/products/crepes-espinaca.webp",
      basePrice: 330,
      allowsXL: false,
      tags: ["pastas", "vegetariano"],
      garnishes: [],
    },
    {
      id: "p16",
      title: "Guiso de Carne con salsa Criolla",
      image: "/products/guiso-carne-criolla.webp",
      basePrice: 330,
      allowsXL: true,
      tags: ["carnes", "invierno"],
      garnishes: [],
    },
    {
      id: "p17",
      title: "Hamburguesa de Espinaca",
      image: "/products/hamburguesa-espinaca.webp",
      basePrice: 330,
      allowsXL: false,
      tags: ["vegetariano", "light"],
      garnishes: [{ id: "ensalada", label: "Ensalada fresca", extra: 0 }],
    },
    {
      id: "p18",
      title: "Muslo de pollo relleno",
      image: "/products/muslo-pollo-relleno.webp",
      basePrice: 330,
      allowsXL: true,
      tags: ["pollo", "proteina", "invierno"],
      garnishes: [{ id: "papas", label: "Papas rústicas", extra: 50 }],
    },
    {
      id: "p19",
      title: "Solomillo de Cerdo",
      image: "/products/solomillo-cerdo.webp",
      basePrice: 330,
      allowsXL: true,
      tags: ["carnes", "proteina"],
      garnishes: [{ id: "pure", label: "Puré", extra: 40 }],
    },
    {
      id: "p20",
      title: "Sorrentinos de Jamón y Queso",
      image: "/products/sorrentinos-jamon.webp",
      basePrice: 330,
      allowsXL: true,
      tags: ["pastas", "invierno"],
      garnishes: [],
    },
  ]);

  /* ======================
     ESTADO DE FILTROS
  ====================== */
  const [activeFilters, setActiveFilters] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  /* ======================
     HANDLERS
  ====================== */
  const toggleFilter = (filterId) => {
    setActiveFilters((prev) =>
      prev.includes(filterId)
        ? prev.filter((id) => id !== filterId)
        : [...prev, filterId],
    );
  };

  const clearFilters = () => {
    setActiveFilters([]);
    setSearchValue("");
  };

  /* ======================
     PRODUCTOS FILTRADOS
  ====================== */
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesFilters =
        activeFilters.length === 0 ||
        activeFilters.every((f) => product.tags.includes(f));

      const matchesSearch =
        !searchValue ||
        product.title.toLowerCase().includes(searchValue.toLowerCase());

      return matchesFilters && matchesSearch;
    });
  }, [products, activeFilters, searchValue]);

  /* ======================
     CONTEXT VALUE
  ====================== */
  const value = {
    products,
    filteredProducts,
    filtersConfig,
    activeFilters,
    searchValue,
    setSearchValue,
    toggleFilter,
    clearFilters,
  };

  return (
    <ProductsDataContext.Provider value={value}>
      {children}
    </ProductsDataContext.Provider>
  );
}

/* ======================
   HOOK
====================== */
export function useProductsData() {
  const context = useContext(ProductsDataContext);
  if (!context) {
    throw new Error(
      "useProductsData debe usarse dentro de ProductsDataProvider",
    );
  }
  return context;
}
