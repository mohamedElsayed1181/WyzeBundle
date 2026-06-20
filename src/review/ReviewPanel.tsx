import { Truck } from "lucide-react";
import { useBundleStore } from "../store/bundleStore";
import SummaryItem from "./SummaryItem";

const SECTION_LABELS: Record<string, string> = {
  cameras: "Cameras",
  sensors: "Sensors",
  accessories: "Accessories",
};

export default function ReviewPanel() {
  const products = useBundleStore((s) => s.products);
  const update = useBundleStore((s) => s.updateQuantity);

  const lineItemTotal = (p: (typeof products)[number]) => {
    if (p.variants)
      return p.variants.reduce((a, v) => a + v.price * v.quantity, 0);
    return p.price * p.quantity;
  };
  const lineCompareTotal = (p: (typeof products)[number]) => {
    const cp = p.comparePrice ?? p.price;
    return cp * p.quantity;
  };

  const activeProducts = products.filter((p) => {
    if (p.variants) return p.variants.some((v) => v.quantity > 0);
    return p.quantity > 0;
  });

  const total = activeProducts.reduce((sum, p) => sum + lineItemTotal(p), 0);
  const compareTotal = activeProducts.reduce(
    (sum, p) => sum + lineCompareTotal(p),
    0,
  );
  const savings = Math.max(0, compareTotal - total);

  const groupedSections = ["cameras", "sensors", "accessories"] as const;
  const plan = activeProducts.find((p) => p.category === "plan");

  return (
    <div className="bg-[#eef0ff] rounded-2xl p-6 h-fit lg:sticky lg:top-5">
      <h2 className="font-extrabold text-lg text-gray-900">
        Your security system
      </h2>
      <p className="text-[12px] text-gray-500 mt-1 leading-snug">
        Review your personalized protection system designed to keep what matters
        most safe.
      </p>

      <div className="mt-5 space-y-5">
        {groupedSections.map((section) => {
          const items = activeProducts.filter((p) => p.category === section);
          if (items.length === 0) return null;

          return (
            <div key={section}>
              <p className="text-[10px] tracking-wide uppercase text-gray-400 font-semibold mb-2">
                {SECTION_LABELS[section]}
              </p>
              <div className="space-y-3">
                {items.map((p) => (
                  <SummaryItem
                    key={p.id}
                    name={p.name}
                    image={p.image}
                    quantity={p.quantity}
                    price={p.price}
                    comparePrice={p.comparePrice}
                    freeLabel={p.freeLabel}
                    onChange={(v) => update(p.id, v)}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {plan && (
        <div className="border-t border-[#dcdfff] mt-5 pt-4 flex items-center justify-between">
          <div>
            <p className="text-[10px] tracking-wide uppercase text-gray-400 font-semibold">
              Monitoring Plan
            </p>
            <p className="text-[13px] font-bold text-gray-900">
              Cam <span className="text-[#5534d8]">Unlimited</span>
            </p>
          </div>
          <div className="text-right leading-tight">
            {plan.comparePrice && (
              <div className="text-[10px] line-through text-gray-400">
                ${plan.comparePrice.toFixed(2)}/mo
              </div>
            )}
            <b className="text-[13px] text-[#5534d8]">
              ${plan.price.toFixed(2)}/mo
            </b>
          </div>
        </div>
      )}

      <div className="border-t border-[#dcdfff] mt-4 pt-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-[13px] text-gray-700">
          <Truck size={16} className="text-emerald-500" />
          <span>Fast Shipping</span>
        </div>
        <span className="text-[13px] font-bold text-emerald-500">FREE</span>
      </div>

      <div className=" mt-5 pt-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 border-2 border-amber-400 p-0.5 shrink-0">
              <div>
                <img src="/src/assets/imgs/satisfaction.png" alt="" />
              </div>
            </div>
          </div>

          <div className="text-right shrink-0 ">
            <div>
              {plan && (
                <span className="inline-block mt-2 bg-[#5534d8] text-white text-[10px] font-semibold px-2.5 py-1 rounded-md">
                  As low as ${plan.price.toFixed(2)}/mo
                </span>
              )}
            </div>
            <div className="flex gap-2">
              <div>
                {compareTotal > total && (
                  <div className="text-[18px] line-through text-gray-400 mt-1">
                    ${compareTotal.toFixed(2)}
                  </div>
                )}
              </div>
              <div className="text-2xl font-extrabold text-[#5534d8]">
                ${total.toFixed(2)}
              </div>
            </div>
          </div>
        </div>

        {savings > 0 && (
          <p className="text-[12px] font-semibold text-emerald-500 text-right mt-2">
            Congrats! You're saving ${savings.toFixed(2)} on your security
            bundle!
          </p>
        )}

        <button
          type="button"
          className="
            w-full
            bg-[#5534d8]
            text-white
            font-semibold
            py-3
            rounded-xl
            mt-4
            hover:bg-[#4527b8]
            transition-colors
          "
        >
          Checkout
        </button>

        <button
          type="button"
          className="
            w-full
            text-center
            text-[12px]
            text-gray-500
            underline
            mt-3
          "
        >
          Save my system for later
        </button>
      </div>
    </div>
  );
}
