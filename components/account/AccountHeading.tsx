export default function AccountHeading({ title, description }: { title: string; description?: string }) {
  return (
    <>
      <h1 className="font-serif text-50 tracking-tight-2 text-black">{title}</h1>
      {description && (
        <p className="mt-5.25 w-171.5 font-mono text-base tracking-tight-2 text-muted-2">{description}</p>
      )}
    </>
  );
}