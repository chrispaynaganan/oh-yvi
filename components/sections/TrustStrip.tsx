import { Fragment } from "react";
import { trustPoints } from "@/data/homepage";

// Repeated so one copy is wider than the screen; two copies make the loop seamless.
const items = [...trustPoints, ...trustPoints, ...trustPoints, ...trustPoints];

export default function TrustStrip() {
  return (
    <section aria-label={trustPoints.join(", ")} className="overflow-hidden bg-strip py-2">
      <div className="flex w-max animate-marquee motion-reduce:animate-none">
        {[0, 1].map((copy) => (
          <ul key={copy} aria-hidden className="flex shrink-0 items-center gap-2.5 pr-2.5">
            {items.map((text, i) => (
              <Fragment key={i}>
                <li className="trim font-mono text-9 whitespace-nowrap text-strip-text">
                  {text}
                </li>
                <li className="size-0.75 shrink-0 rounded-full bg-white" />
              </Fragment>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}