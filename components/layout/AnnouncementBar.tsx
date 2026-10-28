import Image from "next/image";
import Link from "next/link";

export default function AnnouncementBar() {
  return (
    <div className="flex justify-center px-4 pt-3.75">
      <div className="flex w-142 max-w-full items-center justify-center gap-7 rounded-md bg-brand px-4 py-2">
        <p className="truncate font-mono text-10 font-bold text-white">
          Complimentary delivery on orders over ₱1,500
        </p>
        <Link
          href="/shop"
          className="flex shrink-0 items-center gap-1.5 text-white hover:underline"
        >
          <span className="trim block font-serif text-10">Shop now</span>
          <span className="relative h-1.375 w-1.875">
            <span className="absolute inset-[-8%_-5.71%]">
              <Image src="/icons/arrow-right-small.svg" alt="" fill unoptimized />
            </span>
          </span>
        </Link>
      </div>
    </div>
  );
}