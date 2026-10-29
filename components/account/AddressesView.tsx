"use client";

import Image from "next/image";
import { useState } from "react";
import AddressEditor, { EMPTY_ADDRESS } from "@/components/account/AddressEditor";
import { formatAddress } from "@/data/account";
import { addAddress, removeAddress, setPrimaryAddress, updateAddress, useAddressBook } from "@/lib/addresses";
import { cn } from "@/lib/utils";

export default function AddressesView() {
  const book = useAddressBook();
  const [editing, setEditing] = useState<string | null>(null); // address id, or "new"

  if (!book) return <div aria-hidden className="mt-9.75 h-100" />;

  return (
    <div className="relative mt-9.75 mb-6 rounded-4xl bg-white px-4 pt-4 pb-9.75">
      {editing === "new" && (
        <div className="p-4">
          <AddressEditor
            initial={EMPTY_ADDRESS}
            saveLabel="Add address"
            onCancel={() => setEditing(null)}
            onSave={(address) => {
              addAddress(address);
              setEditing(null);
            }}
          />
        </div>
      )}

      {book.addresses.length === 0 && editing !== "new" && (
        <p className="p-4 font-mono text-sm text-muted">No saved addresses yet. Add one to check out faster.</p>
      )}

      <ul>
        {book.addresses.map((address) => {
          const primary = address.id === book.primaryId;

          if (editing === address.id) {
            return (
              <li key={address.id} className="p-4">
                <AddressEditor
                  initial={address}
                  onCancel={() => setEditing(null)}
                  onSave={(next) => {
                    updateAddress(address.id, next);
                    setEditing(null);
                  }}
                />
              </li>
            );
          }

          return (
            <li key={address.id} className="flex items-center justify-between gap-6 border-b border-line-soft p-4">
              <div className="flex min-w-0 flex-col gap-3">
                <p className="font-serif text-xl tracking-tight-2 text-black">{address.label}</p>
                <p className="flex items-center gap-3 font-mono text-sm tracking-tight-2 text-black">
                  <span className="trim block">{address.recipient}</span>
                  <span aria-hidden className="size-0.75 rounded-full bg-black" />
                  <span className="trim block">{address.phone}</span>
                </p>
                <p className="font-mono text-sm tracking-tight-2 text-muted">{formatAddress(address)}</p>
              </div>

              <div className="flex shrink-0 items-center gap-4">
                <button
                  type="button"
                  onClick={() => setPrimaryAddress(address.id)}
                  aria-pressed={primary}
                  aria-label={primary ? `${address.label} is your primary address` : `Make ${address.label} your primary address`}
                  title={primary ? "Primary address" : "Make primary"}
                  className={cn(
                    "flex size-12.5 items-center justify-center rounded-full transition-colors",
                    primary ? "bg-brand" : "border border-line-dark hover:border-brand",
                  )}
                >
                  <Image
                    src={primary ? "/icons/key-light.svg" : "/icons/key-dark.svg"}
                    alt=""
                    width={15}
                    height={29}
                    className="h-7.25 w-3.75"
                    unoptimized
                  />
                </button>
                <button
                  type="button"
                  onClick={() => setEditing(address.id)}
                  aria-label={`Edit ${address.label}`}
                  className="relative size-12.5 transition-opacity hover:opacity-80"
                >
                  <Image src="/icons/edit-circle-lg.svg" alt="" fill unoptimized />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm(`Delete the “${address.label}” address?`)) removeAddress(address.id);
                  }}
                  aria-label={`Delete ${address.label}`}
                  className="relative size-12.5 transition-opacity hover:opacity-80"
                >
                  <Image src="/icons/delete-circle.svg" alt="" fill unoptimized />
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      <button
        type="button"
        onClick={() => setEditing("new")}
        className="absolute -bottom-5.5 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-full bg-white px-5.5 py-3.5 shadow-float transition-transform hover:-translate-y-0.5"
      >
        <Image src="/icons/plus.svg" alt="" width={19} height={19} className="size-4.75" unoptimized />
        <span className="trim block font-serif text-xl tracking-tight-2 whitespace-nowrap text-black">Add New Address</span>
      </button>
    </div>
  );
}