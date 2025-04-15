import { Navbar } from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { useState } from "react";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="relative flex flex-col h-screen overflow-hidden h-vh">
      <Navbar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <div className="flex overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} />
        <main className="flex-1 p-6 overflow-auto">
          {/* <h1 className="text-2xl font-bold">Dashboard</h1> */}
          {children}
        </main>
      </div>
    </div>
  );
}
