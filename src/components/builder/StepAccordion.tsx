import { ChevronDown, ChevronUp } from "lucide-react";
import type { ReactNode } from "react";

interface Props {
  step: number;
  totalSteps: number;
  title: string;
  icon: ReactNode;
  open: boolean;
  count: number;
  children: ReactNode;
  nextLabel?: string;
  onToggle: () => void;
  onNext: () => void;
}

export default function StepAccordion({
  step,
  totalSteps,
  title,
  icon,
  open,
  count,
  children,
  nextLabel,
  onToggle,
  onNext,
}: Props) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="w-full text-left px-5 pt-3 pb-3"
      >
        <p className="text-[10px] tracking-wide text-gray-400 font-semibold uppercase mb-1">
          Step {step} of {totalSteps}
        </p>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-gray-400">{icon}</span>
            <h2 className="font-bold text-[15px] text-gray-900">{title}</h2>
          </div>

          <div className="flex items-center gap-2 text-xs font-medium text-[#5534d8]">
            {count > 0 && <span>{count} selected</span>}
            {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </div>
        </div>
      </button>

      {open && (
        <div className="px-5 pb-5 bg-[#f6f4ff]">
          {children}

          <button
            type="button"
            onClick={onNext}
            className="
              mt-4
              bg-white
              border border-[#5534d8]
              text-[#5534d8]
              px-4 py-2
              rounded-lg
              text-xs font-semibold
              hover:bg-[#5534d8] hover:text-white
              transition-colors
            "
          >
            {nextLabel ?? "Next"}
          </button>
        </div>
      )}
    </div>
  );
}
