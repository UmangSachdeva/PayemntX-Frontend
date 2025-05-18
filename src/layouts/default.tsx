import { Navbar } from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { useState, ReactNode } from "react";
import { Outlet } from "react-router-dom";

interface DefaultLayoutProps {
  children?: ReactNode;
}

export default function DefaultLayout({ children }: DefaultLayoutProps) {
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
          {children ?? <Outlet />}
        </main>
      </div>
    </div>
  );
}
