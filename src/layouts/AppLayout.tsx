import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { useState } from "react";
import { Outlet } from "react-router-dom";

export const AppLayout = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <main className="">
      <div className="container relative mx-auto bg-background">
        <Header
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
          showDropdown={showDropdown}
          setShowDropdown={setShowDropdown}
        />
        <Sidebar showSidebar={showSidebar} />
        <div className="p-4 sm:ml-64">
          <Outlet />
        </div>
      </div>
    </main>
  );
};
