import NoSidebar from "@/components/nosidebar";
import { Outlet } from "react-router-dom";

export default function NoSidebarLayout() {
  return (
    <div className="relative flex flex-col h-screen">
      <NoSidebar />

      <main className="container flex-grow px-6 pt-16 mx-auto max-w-7xl">
        <Outlet />
      </main>
    </div>
  );
}
