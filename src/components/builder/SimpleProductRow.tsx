import QuantityStepper from "../ui/QuantityStepper";
import { useBundleStore } from "../../store/bundleStore";
import type { Product } from "../../types";

export default function SimpleProductRow({ product }: { product: Product }) {
  const update = useBundleStore((s) => s.updateQuantity);

  return (
    <div className="flex items-center justify-between bg-white rounded-lg border border-gray-200 px-3 py-2.5">
      <div className="flex items-center gap-3 min-w-0">
        <img
          src={product.image}
          alt={product.name}
          className="w-10 h-10 object-contain rounded bg-gray-50 shrink-0"
        />
        <div className="min-w-0">
          <p className="text-[13px] font-semibold text-gray-900 truncate">
            {product.name}
          </p>
          <p className="text-[11px] text-gray-400 truncate">
            {product.description}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 shrink-0">
        <QuantityStepper
          size="sm"
          value={product.quantity}
          onChange={(v) => update(product.id, v)}
        />
        <div className="text-right leading-tight w-16">
          {product.comparePrice && product.comparePrice > product.price && (
            <div className="text-[10px] line-through text-gray-400">
              ${product.comparePrice.toFixed(2)}
            </div>
          )}
          <b className="text-[13px] text-gray-900">
            {product.freeLabel ?? `$${product.price.toFixed(2)}${product.unit ?? ""}`}
          </b>
        </div>
      </div>
    </div>
  );
}
