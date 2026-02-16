import ProductPreview from "./ProductPreview";
import ProductConfigurator from "./ProductConfigurator";

export default function ProductCard({
  product,
  isConfigOpen,
  onOpen,
  onClose,
}) {
  return (
    <>
      {!isConfigOpen && <ProductPreview product={product} onAdd={onOpen} />}

      {isConfigOpen && (
        <ProductConfigurator product={product} onCancel={onClose} />
      )}
    </>
  );
}
