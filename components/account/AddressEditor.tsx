"use client";

import { useState, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import type { Address } from "@/types";

const INPUT =
  "h-11 w-full rounded-full border border-line-dark bg-white px-4 font-mono text-sm text-ink outline-none placeholder:text-muted focus:border-brand";

function Field({
  label,
  id,
  className,
  ...input
}: { label: string; id: string; className?: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={cn("flex flex-col gap-3.5", className)}>
      <label htmlFor={id} className="font-mono text-base text-black">
        {label}
      </label>
      <input id={id} className={INPUT} {...input} />
    </div>
  );
}

const ADDRESS_FIELDS: { key: keyof Address; label: string; className?: string; autoComplete?: string }[] = [
  { key: "label", label: "Label (e.g. Home)" },
  { key: "recipient", label: "Recipient", autoComplete: "name" },
  { key: "phone", label: "Phone", autoComplete: "tel" },
  { key: "line1", label: "Street & barangay", className: "col-span-2", autoComplete: "street-address" },
  { key: "city", label: "City", autoComplete: "address-level2" },
  { key: "province", label: "Province", autoComplete: "address-level1" },
  { key: "postalCode", label: "Postal code", autoComplete: "postal-code" },
];

export const EMPTY_ADDRESS: Address = {
  label: "",
  recipient: "",
  phone: "",
  line1: "",
  city: "",
  province: "",
  postalCode: "",
};

export default function AddressEditor({
  initial,
  onSave,
  onCancel,
  saveLabel = "Save address",
}: {
  initial: Address;
  onSave: (address: Address) => void;
  onCancel: () => void;
  saveLabel?: string;
}) {
  const [draft, setDraft] = useState(initial);
  const [error, setError] = useState("");

  function save() {
    if (ADDRESS_FIELDS.some(({ key }) => !draft[key].trim())) {
      setError("Please fill in every field.");
      return;
    }
    onSave(draft);
  }

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-line-soft p-4">
      <div className="grid grid-cols-2 gap-4">
        {ADDRESS_FIELDS.map((field) => (
          <Field
            key={field.key}
            id={`address-${field.key}`}
            label={field.label}
            className={field.className}
            autoComplete={field.autoComplete}
            value={draft[field.key]}
            onChange={(e) => setDraft({ ...draft, [field.key]: e.target.value })}
          />
        ))}
      </div>
      {error && <p className="font-mono text-xs text-promo">{error}</p>}
      <div className="flex justify-end gap-3">
        <button type="button" onClick={onCancel} className="rounded-full border border-line-dark px-4 py-2.5 hover:border-brand">
          <span className="trim block font-mono text-sm text-black">Cancel</span>
        </button>
        <button type="button" onClick={save} className="rounded-full bg-brand px-4 py-2.5 text-white hover:opacity-90">
          <span className="trim block font-mono text-sm">{saveLabel}</span>
        </button>
      </div>
    </div>
  );
}