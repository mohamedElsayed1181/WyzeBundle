import QuantityStepper from "../components/ui/QuantityStepper";

interface Props {
  name: string;
  image: string;
  quantity: number;
  price: number;
  comparePrice?: number;
  freeLabel?: string;
  unit?: string;
  onChange: (v: number) => void;
}

export default function SummaryItem({
  name,
  image,
  quantity,
  price,
  comparePrice,
  freeLabel,
  unit,
  onChange,
}: Props) {
  const lineTotal = price * quantity;

  return (
    <div className="flex items-center gap-3">
      <img
        src={image}
        alt={name}
        className="w-9 h-9 object-contain rounded bg-white shrink-0"
      />

      <div className="flex-1 min-w-0">
        <p className="text-[12px] font-semibold text-gray-800 truncate">
          {name}
        </p>
      </div>

      <QuantityStepper size="sm" value={quantity} onChange={onChange} />

      <div className="text-right leading-tight w-16 shrink-0">
        {comparePrice && comparePrice > price && (
          <div className="text-[10px] line-through text-gray-400">
            ${(comparePrice * quantity).toFixed(2)}
          </div>
        )}
        <b className="text-[12px] text-[#5534d8]">
          {freeLabel ?? `$${lineTotal.toFixed(2)}${unit ?? ""}`}
        </b>
      </div>
    </div>
  );
}
