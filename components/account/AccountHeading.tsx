export default function AccountHeading({ title, description }: { title: string; description?: string }) {
  return (
    <>
      <h1 className="font-serif text-50 tracking-tight-2 text-black max-xl:text-44">{title}</h1>
      {description && (
        <p className="mt-5.25 w-171.5 font-mono text-base tracking-tight-2 text-muted-2 max-xl:w-91.5 max-xl:text-sm">{description}</p>
      )}
    </>
  );
}