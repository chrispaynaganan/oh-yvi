import Image from "next/image";
import Link from "next/link";

export default function AnnouncementBar() {
  return (
    <div className="flex justify-center px-4 pt-[15px]">
      <div className="flex w-[568px] max-w-full items-center justify-center gap-[28px] rounded-md bg-brand px-4 py-2">
        <p className="truncate font-mono text-[10px] font-bold text-white">
          Complimentary delivery on orders over ₱1,500
        </p>
        <Link
          href="/shop"
          className="flex shrink-0 items-center gap-[6px] text-white hover:underline"
        >
          <span className="trim block font-serif text-[10px]">Shop now</span>
          <span className="relative h-[5.417px] w-[7.583px]">
            <span className="absolute inset-[-8%_-5.71%]">
              <Image src="/icons/arrow-right-small.svg" alt="" fill unoptimized />
            </span>
          </span>
        </Link>
      </div>
    </div>
  );
}