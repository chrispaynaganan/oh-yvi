export default function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center justify-center rounded-sm bg-surface-tag px-2.75 py-1.5">
      <span className="trim block font-mono text-10 whitespace-nowrap text-tag-text">
        {children}
      </span>
    </span>
  );
}