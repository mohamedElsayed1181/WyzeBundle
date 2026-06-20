interface Props {
  value: number;
  onChange: (v: number) => void;
  size?: "sm" | "md";
}

export default function QuantityStepper({ value, onChange, size = "md" }: Props) {
  const isSm = size === "sm";

  return (
    <div
      className={`
        flex items-center
        border border-gray-200
        rounded-md
        bg-white
        overflow-hidden
        ${isSm ? "text-[11px]" : "text-xs"}
      `}
    >
      <button
        type="button"
        className={`
          flex items-center justify-center
          text-gray-500 hover:bg-gray-50
          active:bg-gray-100
          transition-colors
          ${isSm ? "w-5 h-5" : "w-6 h-6"}
        `}
        onClick={() => onChange(Math.max(0, value - 1))}
        aria-label="Decrease quantity"
      >
        −
      </button>

      <span
        className={`
          font-medium text-gray-700
          ${isSm ? "px-1.5 min-w-[16px]" : "px-2 min-w-[20px]"}
          text-center
        `}
      >
        {value}
      </span>

      <button
        type="button"
        className={`
          flex items-center justify-center
          text-gray-500 hover:bg-gray-50
          active:bg-gray-100
          transition-colors
          ${isSm ? "w-5 h-5" : "w-6 h-6"}
        `}
        onClick={() => onChange(value + 1)}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}
