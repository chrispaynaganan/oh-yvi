import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Newsletter from "@/components/sections/Newsletter";

export default function StoreLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <div className="sticky top-0 z-40 bg-white">
        <AnnouncementBar />
        <Header />
      </div>
      {children}
      <Newsletter />
    </>
  );
}