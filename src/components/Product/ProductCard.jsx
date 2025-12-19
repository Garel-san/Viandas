import { useState } from "react";
import ProductPreview from "./ProductPreview";
import ProductConfigurator from "./ProductConfigurator";

export default function ProductCard({ product }) {
  const [mode, setMode] = useState("view"); // view | config

  const handleOpenConfigurator = () => {
    setMode("config");
  };

  const handleCancelConfigurator = () => {
    setMode("view");
  };

  return (
    <>
      {mode === "view" && (
        <ProductPreview product={product} onAdd={handleOpenConfigurator} />
      )}

      {mode === "config" && (
        <ProductConfigurator
          product={product}
          onCancel={handleCancelConfigurator}
        />
      )}
    </>
  );
}
