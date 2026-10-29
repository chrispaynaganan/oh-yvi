import Link from "next/link";
import { Fragment } from "react";
import LegalToc from "@/components/legal/LegalToc";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import type { LegalBlock, LegalDoc, RichPart } from "@/data/legal";
import { store } from "@/data/store";

const dateFormat = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "Asia/Manila",
});
const formatDate = (iso: string) => dateFormat.format(new Date(iso));

function Rich({ body }: { body: string | RichPart[] }) {
  if (typeof body === "string") return body;
  return body.map((part, i) =>
    typeof part === "string" ? (
      <Fragment key={i}>{part}</Fragment>
    ) : part.href ? (
      <Link key={i} href={part.href} className="font-bold text-ink underline hover:text-brand">
        {part.text}
      </Link>
    ) : (
      <strong key={i} className="font-bold">
        {part.text}
      </strong>
    ),
  );
}

function Block({ block }: { block: LegalBlock }) {
  switch (block.type) {
    case "text":
      return (
        <p className="font-mono text-lg text-muted">
          <Rich body={block.body} />
        </p>
      );

    case "cards":
      return (
        <div className="flex gap-4">
          {block.items.map((card) => (
            <div key={card.title} className="flex flex-1 flex-col gap-5 rounded-lg border border-line-soft p-4 font-mono text-lg text-muted">
              <p className="font-bold">{card.title}</p>
              <p>{card.body}</p>
            </div>
          ))}
        </div>
      );

    case "table":
      return (
        <table className="w-full border-collapse font-mono text-lg text-muted">
          <thead>
            <tr>
              {block.head.map((cell) => (
                <th key={cell} scope="col" className="h-10.5 border border-line-strong px-4 text-left font-bold">
                  {cell}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.rows.map((row) => (
              <tr key={row[0]}>
                {row.map((cell, i) => (
                  <td key={i} className="h-10.5 border border-line-strong px-4">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      );

    case "chips":
      return (
        <ul className="flex flex-wrap gap-2.5">
          {block.items.map((chip) => (
            <li key={chip} className="rounded-xl border border-line px-3 py-2.5">
              <span className="trim block font-mono text-sm text-muted">{chip}</span>
            </li>
          ))}
        </ul>
      );

    case "contact":
      return (
        <address className="flex flex-col gap-3.5 rounded-2xl bg-surface-muted p-4 font-mono text-lg text-muted not-italic">
          <p>{store.sellerName}</p>
          <p className="flex gap-5">
            <a href={`mailto:${store.supportEmail}`} className="trim block hover:text-brand">
              {store.supportEmail}
            </a>
            <a href={`tel:${store.phone.replace(/\s/g, "")}`} className="trim block hover:text-brand">
              {store.phone}
            </a>
          </p>
          <p>{store.location}</p>
        </address>
      );
  }
}

export default function LegalPage({ doc }: { doc: LegalDoc }) {
  return (
    <main className="mx-auto max-w-site px-15 pt-16.25 pb-14">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: doc.breadcrumb }]} />

      <h1 className="mt-11 font-serif text-38 text-ink">{doc.title}</h1>
      <div className="mt-5.5 flex gap-8.5 font-mono text-base text-muted">
        <p>Last updated: {formatDate(doc.updated)}</p>
        <p>Effective: {formatDate(doc.effective)}</p>
      </div>

      <div className="mt-21.5 grid grid-cols-12 items-start gap-x-5">
        <LegalToc items={doc.sections.map(({ id, title }) => ({ id, title }))} />

        <div className="col-span-8 col-start-5 flex flex-col gap-9.5">
          {doc.sections.map((section, i) => (
            <section key={section.id} id={section.id} className="flex scroll-mt-50 flex-col gap-5">
              <h2 className="font-serif text-xl text-ink">
                {i + 1}. {section.title}
              </h2>
              {section.blocks.map((block, j) => (
                <Block key={j} block={block} />
              ))}
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}