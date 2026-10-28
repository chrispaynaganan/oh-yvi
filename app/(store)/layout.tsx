import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Newsletter from "@/components/sections/Newsletter";

export default function StoreLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <AnnouncementBar />
      <Header />
      {children}
      <Newsletter />
    </>
  );
}