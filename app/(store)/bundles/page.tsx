import type { Metadata } from "next";
import BundleBrowser from "@/components/bundles/BundleBrowser";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { bundles } from "@/data/bundles";
import { bundlesPage } from "@/data/bundlesPage";

export const metadata: Metadata = {
  title: "Bundles — Oh, Yvi!",
  description: bundlesPage.intro,
};

export default function BundlesPage() {
  return (
    <main className="mx-auto max-w-site px-15 pt-16.25">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Bundles" }]} />

      <h1 className="mt-7.75 font-serif text-collection whitespace-nowrap text-accent">
        {bundlesPage.title}
      </h1>

      <div className="mt-8.25 grid grid-cols-12 gap-x-5">
        <p className="col-span-4 font-mono text-sm text-muted">{bundlesPage.intro}</p>
        <p className="col-span-4 col-start-6 font-mono text-sm text-muted">{bundlesPage.aside}</p>
      </div>

      <BundleBrowser bundles={bundles} filters={bundlesPage.filters} />
    </main>
  );
}