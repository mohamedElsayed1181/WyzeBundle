import { useState } from "react";
import QuantityStepper from "../ui/QuantityStepper";
import VariantSelector from "./VariantSelector";
import { useBundleStore } from "../../store/bundleStore";
import type { Product } from "../../types";

export default function ProductCard({ product }: { product: Product }) {
  const update = useBundleStore((s) => s.updateQuantity);
  const select = useBundleStore((s) => s.selectVariant);

  const [variant, setVariant] = useState(product.variants?.[0]?.id);
  const active = product.variants?.find((v) => v.id === variant);

  const quantity = active ? active.quantity : product.quantity;
  const price = active?.price ?? product.price;
  const comparePrice = active?.comparePrice ?? product.comparePrice;
  const selected = quantity > 0;

  return (
    <div
      className={`
        relative
        bg-white
        rounded-xl
        border
        p-3
        flex flex-col
        transition-colors
        ${selected ? "border-[#5534d8] ring-1 ring-[#5534d8]" : "border-gray-200"}
      `}
    >
      <div className="h-5 mb-1">
        {product.badge && (
          <span
            className="
              inline-block
              text-[10px] font-semibold
              bg-[#5534d8] text-white
              px-2 py-0.5
              rounded
            "
          >
            {product.badge}
          </span>
        )}
      </div>

      <div className="h-24 flex items-center justify-center">
        <img
          src={product.image}
          alt={product.name}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      <h3 className="text-[13px] font-bold text-gray-900 mt-2 leading-tight">
        {product.name}
      </h3>
      <p className="text-[11px] text-gray-400 mt-1 leading-snug line-clamp-2">
        {product.description}{" "}
        <span className="text-[#5534d8] underline cursor-pointer">
          Learn More
        </span>
      </p>

      {product.variants && (
        <VariantSelector
          variants={product.variants}
          selected={variant!}
          onSelect={(id) => {
            setVariant(id);
            select(product.id, id);
          }}
        />
      )}

      <div className="flex-1" />

      <div className="flex justify-between items-end mt-3">
        <QuantityStepper
          size="sm"
          value={quantity}
          onChange={(v) => update(product.id, v, variant)}
        />

        <div className="text-right leading-tight">
          {comparePrice && comparePrice > price && (
            <div className="text-[10px] line-through text-gray-400">
              ${comparePrice.toFixed(2)}
            </div>
          )}
          <b className="text-[13px] text-gray-900">${price.toFixed(2)}</b>
        </div>
      </div>
    </div>
  );
}
