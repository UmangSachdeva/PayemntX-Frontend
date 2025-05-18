import NoSidebar from "@/components/nosidebar";
import { Outlet } from "react-router-dom";
import { ReactNode } from "react";

interface NoSidebarLayoutProps {
  children?: ReactNode;
}

export default function NoSidebarLayout({ children }: NoSidebarLayoutProps) {
  return (
    <div className="relative flex flex-col h-screen">
      <NoSidebar />
      <main className="container flex-grow px-6 pt-16 mx-auto max-w-7xl">
        {children ?? <Outlet />}
      </main>
    </div>
  );
}
