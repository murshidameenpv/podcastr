import LeftSidebar from "@/components/LeftSidebar";
import MobileNav from "@/components/MobileNav";
import RightSidebar from "@/components/RightSidebar";
import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex flex-col">
      <main className="relative flex bg-black-3">
        <LeftSidebar/>
        <section className="flex flex-col min-h-screen flex-1 px-4 sm:px-14">
          <div className="mx-auto w-full flex max-w-5xl flex-col max-sm:px-4">
            <div className="flex items-center justify-between h-16 md:hidden">
              <Image src="/icons/logo.svg"  alt="menu open" width={30} height={30}/>
              <MobileNav/>
            </div>
            <div className="flex flex-col md:pb-14">
              Toaster
              {children}
            </div>
          </div>
        </section>
        <RightSidebar/>
      </main>
    </div>
  );
}
