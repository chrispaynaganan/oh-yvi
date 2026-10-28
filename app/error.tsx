"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <main className="p-10">
      <p>Something went wrong (placeholder)</p>
      <button onClick={() => reset()}>Try again</button>
    </main>
  );
}