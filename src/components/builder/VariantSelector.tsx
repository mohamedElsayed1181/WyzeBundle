import type { Variant } from "../../types";

interface Props {
  variants: Variant[];
  selected: string;
  onSelect: (id: string) => void;
}

export default function VariantSelector({
  variants,
  selected,
  onSelect,
}: Props) {
  return (
    <div className="flex gap-2 mt-3">
      {variants.map((v) => (
        <button
          key={v.id}
          type="button"
          onClick={() => onSelect(v.id)}
          className={`
            flex items-center gap-1.5
            border rounded-md
            px-2 py-1
            text-[11px] font-medium
            transition-colors
            ${
              selected === v.id
                ? "border-[#5534d8] bg-[#f3f0ff] text-[#5534d8]"
                : "border-gray-200 text-gray-500 hover:border-gray-300"
            }
          `}
        >
          <img
            src={v.image}
            alt={v.name}
            className="w-4 h-4 rounded-full object-cover"
          />
          <span>{v.name}</span>
        </button>
      ))}
    </div>
  );
}
