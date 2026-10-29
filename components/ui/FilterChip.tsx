import { cn } from "@/lib/utils";

type FilterChipProps = {
  label: string;
  active: boolean;
  onClick: () => void;
};

export default function FilterChip({ label, active, onClick }: FilterChipProps) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "rounded-xl px-3.5 py-2.5 font-serif text-base transition-colors",
        active ? "bg-brand text-white" : "border border-brand text-brand hover:bg-brand/5",
      )}
    >
      <span className="trim block whitespace-nowrap">{label}</span>
    </button>
  );
}