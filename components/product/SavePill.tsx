export default function SavePill({ percent }: { percent: number }) {
  return (
    <span className="inline-flex items-center justify-center rounded-sm bg-save px-2.5 py-1.5">
      <span className="trim block font-mono text-9 whitespace-nowrap text-white">
        save {percent}% off
      </span>
    </span>
  );
}